<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import WishTextAreaComponent from "@/components/WishTextAreaComponent.vue";
import { API_URL, APP_DOMAIN } from "@/helpers/config";
import axios from "axios";
import localStorage from "@/helpers/localStorage";
</script>
<template>
    <div>
        <div class="flex flex-col w-full min-h-full">
            <div class="flex items-center mb-4">
                <svg v-if="group.admin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 min-h-6 min-w-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <div class="text-2xl text-secondary-100 font-bold text-ellipsis overflow-hidden whitespace-nowrap">{{ group.name }}</div>
            </div>
            <div v-if="group.admin && !group.closed" class="h-full justify-between flex flex-col">
                <div class="top flex flex-col top flex-grow">
                    <WishTextAreaComponent placeholder="Ваше желание" class="h-full flex flex-col">
                        <template v-slot:content>
                            <ButtonComponent type="Secondary" title="Сохранить" class="rounded-md" />
                        </template>
                    </WishTextAreaComponent>
                </div>

                <div class="flex flex-col justify-start">
                    <div class="my-5">
                        <div class="text-secondary-100">Нажмите что бы скопировать ссылку:</div>
                        <div class="p-2 bg-secondary-100/20 rounded-lg flex items-center active:bg-secondary-100/50 duration-100">
                            {{ APP_DOMAIN + "/Hwf1g6qGX75ijYgJ" }}
                        </div>
                    </div>
                    <BlockComponent>
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg">Участники</div>
                        </template>
                        <template v-slot:content>
                            <div class="[&>*+*]:mt-2">
                                <MemberElementComponent v-for="groupMember in groupMembers" :member-name="groupMember.name" :member-vkid="groupMember.vkid" />
                                <ButtonComponent v-if="groupMembersCount > 3" type="Secondary" title="Все участники" class="p-2" />
                            </div>
                        </template>
                    </BlockComponent>
                    <ButtonComponent type="Primary" title="Начать игру" class="p-2 mt-4" />
                </div>
            </div>
            <div v-if="!group.admin">
                <WishTextAreaComponent v-if="!closed" placeholder="Ваше желание" class="h-[500px]" />
                <div v-if="group.closed">
                    <BlockComponent class="mb-5">
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg text-text-dark">Вашему подарку нашелся получатель!</div>
                        </template>
                        <template v-slot:content>
                            <MemberElementComponent member-name="Алексей Гузиков" :removable="false" />
                        </template>
                    </BlockComponent>
                    <BlockComponent>
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg text-text-dark">Что хочет получить в подарок:</div>
                        </template>
                        <template v-slot:content>
                            <div class="text-text-dark">Я хочу машину черную и хуйню</div>
                        </template>
                    </BlockComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            group: {},
            groupMembers: {},
            groupMembersCount: 0,
        };
    },
    created() {
        axios
            .get(API_URL + "group/" + this.$route.params.groupJoinCode, {
                headers: {
                    Authorization: localStorage.get("jwt"),
                },
            })
            .then((response) => {
                this.group = response.data.data.info.group;
            });

        axios
            .get(API_URL + "group/" + this.$route.params.groupJoinCode + "/members?from=0&to=3", {
                headers: {
                    Authorization: localStorage.get("jwt"),
                },
            })
            .then((response) => {
                let groupMembers = response.data.data.info.groupMembers;
                this.groupMembersCount = groupMembers.length;
                groupMembers.pop();
                this.groupMembers = groupMembers;
            });
    },
};
</script>
