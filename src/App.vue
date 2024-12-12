<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import localStorage from "./helpers/localStorage";
</script>

<template>
    <div class="flex flex-col overflow-x-hidden">
        <HeaderComponent />
        <RouterView class="!min-h-[calc(100vh_-_70px)] wrapper-base wrapper-1152" />
    </div>
</template>

<script>
export default {
    created() {
        if (!localStorage.has("jwt")) {
            localStorage.add("jwt", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InZraWQiOjEyMzQsImlkIjoxfX0.NLhDGBNt3fhCUwo0VDUBAhVraq1PTFIf4DTEH7pdyRw");
        }
    },
};
</script>
