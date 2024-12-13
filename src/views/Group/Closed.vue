<script setup>
import BlockComponent from "@/components/BlockComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
</script>

<template>
    <div>
        <BlockComponent class="mb-5">
            <template v-slot:title>
                <div class="pb-2 w-full font-semibold text-lg text-text-dark">Вашему подарку нашелся получатель!</div>
            </template>
            <template v-slot:content>
                <MemberElementComponent :member-name="recipient.name" :member-vkid="recipient.vkid" :removable="false" />
            </template>
        </BlockComponent>
        <BlockComponent>
            <template v-slot:title>
                <div class="pb-2 w-full font-semibold text-lg text-text-dark">Что хочет получить в подарок:</div>
            </template>
            <template v-slot:content>
                <div :class="{ 'font-semibold': recipient.wish == '' }" class="text-text-dark break-words">{{ recipient.wish == "" ? "Ничего не хочет" : recipient.wish }}</div>
            </template>
        </BlockComponent>
    </div>
</template>

<script>
import { API_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
import axios from "axios";

export default {
    data() {
        return {
            recipient: {},
        };
    },
    created() {
        axios
            .get(API_URL + "group/" + this.$route.params.groupJoinCode + "/recipient", {
                headers: {
                    Authorization: localStorage.get("jwt"),
                },
            })
            .then((response) => {
                this.recipient = response.data.data.info.recipient;
            });
    },
};
</script>
