<script setup>
import CardComponent from "@/components/CardComponent.vue";
import { API_URL } from "@/helpers/config.js";
import axios from "axios";
</script>
<template>
    <div class="flex flex-col items-center">
        <div class="w-full grid grid-cols-[repeat(auto-fit,minmax(370px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(555px,1fr))] 4xl:grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-4 justify-evenly justify-items-center">
            <CardComponent @click="$router.replace('/map/' + item.publishedfileid)" v-for="item in items" :title="item.title" :description="item.description" :image="item.preview_url" />
        </div>
        <div v-show="loading" class="mt-10 flex justify-center items-center z-50">
            <div class="border-4 border-t-4 border-transparent border-t-accent-100 rounded-full w-16 h-16 animate-spin"></div>
        </div>
    </div>
</template>

<script>
export default {
    
};
</script>
