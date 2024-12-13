<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import axios from "axios";
import { API_URL, VK_AUTH_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
import ModalComponent from "@/components/ModalComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import WrapperComponent from "@/components/WrapperComponent.vue";
</script>
<template>
    <div>
        <div class="flex flex-col w-full min-h-full justify-between relative">
            <div class="my-5">
                <div class="text-2xl text-secondary-100 font-bold mb-4">Как играть?</div>
                <div class="[&>*+*]:mt-4 [&>*>*+*]:ml-4">
                    <div class="flex items-center">
                        <CountComponent number="1" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Откройте группу ниже или нажмите «Создать группу».</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="2" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Отправьте ссылку-приглашение друзьям, чтобы они могли присоединиться к группе.</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="3" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Когда все присоединились и написали свои желания, нажмите «Начать игру».</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="4" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Подарите подарок!</div>
                    </div>
                </div>
            </div>
            <BlockComponent>
                <template v-slot:title>
                    <div class="pb-2 flex w-full justify-between">
                        <div class="font-semibold text-lg text-text-dark">{{ groups.length == 0 ? "Групп пока нет" : "Ваши группы" }}</div>
                    </div>
                </template>
                <template v-slot:content>
                    <div class="[&>*+*]:mt-2">
                        <GroupElementComponent v-for="group in groups" :group-name="group.name" :join-code="group.joinCode" :admin="group.admin" />
                        <ButtonComponent @click="$router.push('groups')" v-if="groups.length > 3" type="Secondary" title="Все группы" class="p-2" />
                        <ButtonComponent @click="$refs.createGroup.open()" type="Primary" title="Создать группу" class="p-2" />
                    </div>
                </template>
            </BlockComponent>
            <ModalComponent ref="createGroup">
                <div class="flex flex-col w-full">
                    <div class="font-semibold text-lg text-text-dark mb-2">Новая группа</div>

                    <WrapperComponent class="rounded-xl mb-4">
                        <InputComponent placeholder="Название группы" v-model:value="newGroupName" />
                    </WrapperComponent>

                    <ButtonComponent @click="createGroup" type="Primary" title="Создать" class="p-2" :disabled="newGroupName.length <= 0 || newGroupName.length >= 250" />
                </div>
            </ModalComponent>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groups: [],
            grupsCount: 0,
            loadingGroups: false,
            newGroupName: "",
        };
    },
    methods: {
        createGroup() {
            if (this.newGroupName.length > 0 && this.newGroupName.length < 250) {
                axios
                    .post(
                        API_URL + "group",
                        { name: this.newGroupName },
                        {
                            headers: {
                                Authorization: localStorage.get("jwt"),
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response);
                        if (response.data.data.status != 200) {
                            this.$router.push("/");
                            return;
                        }
                        this.$router.push(response.data.data.info.group.joinCode);
                    });
            }
        },
        getGroups() {
            if (!this.loadingGroups) {
                this.loadingGroups = true;
                axios
                    .get(API_URL + "user/groups/?from=0&to=4", {
                        headers: {
                            Authorization: localStorage.get("jwt"),
                        },
                    })
                    .then((response) => {
                        let groups = response.data.data.info.groups;
                        this.groupsCount = groups.length;
                        if (groups.length > 1) {
                            groups.pop();
                        }
                        this.groups = groups;
                        this.loadingGroups = false;
                    });
            }
        },
    },
    created() {
        if (!localStorage.has("jwt")) {
            window.location.href = VK_AUTH_URL;
        }
        this.getGroups();
    },
};
</script>
