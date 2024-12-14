<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import WishTextAreaComponent from "@/components/WishTextAreaComponent.vue";
import Admin from "./Group/Admin.vue";
import Closed from "./Group/Closed.vue";
import { API_URL, APP_DOMAIN, VK_AUTH_URL } from "@/helpers/config";
import axios from "axios";
import localStorage from "@/helpers/localStorage";
import ModalComponent from "@/components/ModalComponent.vue";
import WrapperComponent from "@/components/WrapperComponent.vue";
import NotificationComponent from "@/components/NotificationComponent.vue";
</script>
<template>
    <div>
        <div v-if="group" class="flex flex-col w-full min-h-full">
            <NotificationComponent ref="notification"> <div class="font-semibold text-lg text-text-dark w-full text-center">Желание сохранено</div> </NotificationComponent>
            <div class="flex items-center mb-4">
                <svg v-if="group.admin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 min-h-6 min-w-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <div class="text-2xl text-secondary-100 font-bold text-ellipsis overflow-hidden whitespace-nowrap">{{ group.name }}</div>
            </div>
            <Admin v-if="group.admin && !group.closed" @game-started="group.closed = true" @wish-saved="$refs.notification.show()" />
            <WishTextAreaComponent v-if="!group.admin && !group.closed" @saved="$refs.notification.show()" placeholder="Ваше желание" class="flex flex-col h-full" />
            <Closed v-if="group.closed" />
        </div>
        <ModalComponent ref="groupClosed" type="Middle" class="[&>*]:mx-4" :closable="false">
            <div class="flex flex-col w-full">
                <div class="mb-4 flex justify-center items-center">
                    <div class="font-semibold text-lg text-text-dark">Участники уже распределены.</div>
                </div>

                <ButtonComponent @click="$router.push('/')" type="Primary" title="Понятно" class="p-2" />
            </div>
        </ModalComponent>
    </div>
</template>

<script>
export default {
    data() {
        return {
            group: null,
            isMember: false,
            intervalId: null,
        };
    },
    created() {
        if (localStorage.has("fromGroup")) {
            localStorage.remove("fromGroup");
        }
        if (!localStorage.has("jwt")) {
            localStorage.add("fromGroup", this.$route.params.groupJoinCode);
            window.location.href = VK_AUTH_URL;
        }

        this.getGroup();
        this.intervalId = setInterval(this.getGroup, 5000);
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    },

    methods: {
        getGroup() {
            axios
                .get(API_URL + "group/" + this.$route.params.groupJoinCode, {
                    headers: {
                        Authorization: localStorage.get("jwt"),
                    },
                })
                .then((response) => {
                    if (response.data.data.status == 403) {
                        axios
                            .post(
                                API_URL + "group/" + this.$route.params.groupJoinCode + "/join",
                                {},
                                {
                                    headers: {
                                        Authorization: localStorage.get("jwt"),
                                    },
                                }
                            )
                            .then((response) => {
                                if (response.data.data.status != 200) {
                                    this.$refs.groupClosed.open();
                                    return;
                                }
                                axios
                                    .get(API_URL + "group/" + this.$route.params.groupJoinCode, {
                                        headers: {
                                            Authorization: localStorage.get("jwt"),
                                        },
                                    })
                                    .then((response) => {
                                        this.group = response.data.data.info.group;
                                    });
                            });
                    } else if (response.data.data.status == 200) {
                        this.group = response.data.data.info.group;
                    }
                });
        },
    },
};
</script>
