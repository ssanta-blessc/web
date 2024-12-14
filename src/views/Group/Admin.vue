<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import WishTextAreaComponent from "@/components/WishTextAreaComponent.vue";
import { API_URL, APP_DOMAIN } from "@/helpers/config";
import { getJwtPayload } from "@/helpers/jwt";
import axios from "axios";
import localStorage from "@/helpers/localStorage";
import NotificationComponent from "@/components/NotificationComponent.vue";
</script>
<template>
    <div class="h-full justify-between flex flex-col">
        <div class="top flex flex-col top flex-grow">
            <WishTextAreaComponent placeholder="Ваше желание" @saved="$emit('wish-saved')" class="h-full flex flex-col">
                <template v-slot:content>
                    <ButtonComponent type="Secondary" title="Сохранить" class="rounded-md" />
                </template>
            </WishTextAreaComponent>
        </div>

        <div class="flex flex-col justify-start">
            <div class="my-5">
                <div class="text-secondary-100">Нажмите что бы скопировать ссылку:</div>
                <div @click="copyGroupJoinCode" ref="groupJoinCode" class="p-2 bg-secondary-100/20 rounded-lg flex items-center active:bg-secondary-100/50 duration-100">
                    {{ APP_DOMAIN + "/" + $route.params.groupJoinCode }}
                </div>
            </div>
            <BlockComponent>
                <template v-slot:title>
                    <div class="pb-2 flex w-full justify-between">
                        <div class="font-semibold text-lg text-text-dark">Участники</div>
                        <svg @click="getGroupMembers" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="{ 'initial-spin': !loadingMembers, 'infinite-spin': loadingMembers }" class="size-6 stroke-text-dark active:bg-text-dark/20 rounded-lg cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="[&>*+*]:mt-2">
                        <MemberElementComponent @remove-member="removeGroupMember" v-for="groupMember in groupMembers" :member-name="groupMember.name" :member-vkid="groupMember.vkid" />
                        <ButtonComponent @click="$router.push({ path: this.$route.params.groupJoinCode + '/members' })" v-if="groupMembersCount > 4" type="Secondary" title="Все участники" class="p-2" />
                    </div>
                </template>
            </BlockComponent>
            <ButtonComponent @click="startGame" type="Primary" title="Начать игру" class="p-2 mt-4" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groupMembers: [],
            groupMembersCount: 0,
            loadingMembers: false,
            intervalId: null,
        };
    },
    methods: {
        startGame() {
            axios
                .get(API_URL + "group/" + this.$route.params.groupJoinCode + "/start", {
                    headers: {
                        Authorization: localStorage.get("jwt"),
                    },
                })
                .then(() => {
                    this.$emit("game-started");
                });
        },
        copyGroupJoinCode() {
            navigator.clipboard.writeText("https://" + this.$refs.groupJoinCode.innerText);
        },
        removeGroupMember(vkid) {
            axios
                .delete(API_URL + "group/" + this.$route.params.groupJoinCode + "/user/vkid/" + vkid, {
                    headers: {
                        Authorization: localStorage.get("jwt"),
                    },
                })
                .then(() => {
                    this.groupMembers = this.groupMembers.filter((member) => member.vkid != vkid);
                });
        },
        getGroupMembers() {
            if (!this.loadingMembers) {
                this.loadingMembers = true;
                axios
                    .get(API_URL + "group/" + this.$route.params.groupJoinCode + "/members?from=0&to=4", {
                        headers: {
                            Authorization: localStorage.get("jwt"),
                        },
                    })
                    .then((response) => {
                        if (response.data.data.status != 200) {
                            this.$router.push("/");
                            return;
                        }
                        let groupMembers = response.data.data.info.groupMembers.filter((member) => member.vkid != getJwtPayload(localStorage.get("jwt")).payload.vkid);
                        this.groupMembersCount = groupMembers.length;
                        this.groupMembers = groupMembers;
                        this.loadingMembers = false;
                    });
            }
        },
    },
    created() {
        this.getGroupMembers();
        this.intervalId = setInterval(this.getGroupMembers, 5000);
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    },
};
</script>

<style scoped>
@keyframes initial-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes infinite-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.initial-spin {
    animation: initial-spin 1s ease-in-out; /* Однократное вращение */
}

.infinite-spin {
    animation: infinite-spin 1s linear infinite; /* Бесконечное вращение */
}
</style>
