<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import axios from "axios";
import { API_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
</script>
<template>
    <div>
        <div class="flex flex-col w-full min-h-full justify-between">
            <div class="my-5">
                <div class="text-2xl text-secondary-100 font-bold mb-4">Как играть?</div>
                <div class="[&>*+*]:mt-4 [&>*>*+*]:ml-4">
                    <div class="flex items-center">
                        <CountComponent number="1" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Откройте группу ниже или нажмите «Создать группу».</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="2" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Отправьте сслыку-приглашение или QR-Код дрзьям что бы они могли присоедениться к группе.</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="3" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Когда все присоеденились и написали желания, нажмите «Начать игру»</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="4" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Подарите подарок!</div>
                    </div>
                </div>
            </div>
            <BlockComponent>
                <template v-slot:title>
                    <div class="pb-2 w-full font-semibold text-lg text-text-dark">{{ groups.length == 0 ? "Групп пока нет" : "Ваши группы" }}</div>
                </template>
                <template v-slot:content>
                    <div class="[&>*+*]:mt-2">
                        <GroupElementComponent v-for="group in groups" :group-name="group.name" :join-code="group.joinCode" :admin="group.admin" />
                        <ButtonComponent v-if="groups.length > 3" type="Secondary" title="Загрузить ещё" class="p-2" />
                        <ButtonComponent type="Primary" title="Создать группу" class="p-2" />
                    </div>
                </template>
            </BlockComponent>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groups: [],
        };
    },
    created() {
        axios
            .get(API_URL + "user/groups/?from=0&to=4", {
                headers: {
                    Authorization: localStorage.get("jwt"),
                },
            })
            .then((response) => {
                this.groups = response.data.data.info.groups;
                console.log(this.groups);
            });
    },
};
</script>
