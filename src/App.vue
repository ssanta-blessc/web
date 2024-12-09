<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
    <div class="flex flex-col overflow-x-hidden">
        <HeaderComponent />
        <RouterView class="!min-h-[calc(100vh_-_70px)] wrapper-base wrapper-1152" />
    </div>
</template>

<script>
export default {};
</script>
