<script setup>
import { APP_NAME } from "@/helpers/config.js";
</script>
<template>
    <a :href="'/group/' + groupJoinCode" class="p-2 [&_*]:text-ellipsis [&_*]:overflow-hidden [&_*]:whitespace-nowrap px-4 flex items-center justify-between cursor-pointer bg-accent-100 rounded-lg overflow-hidden">
        <div class="flex items-center [&>*+*]:ml-2">
            <div class="font-semibold !max-w-[60%]">{{ groupName }}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 min-w-6 min-h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </a>
</template>

<script>
export default {
    props: {
        groupName: {
            type: String,
            required: true,
        },
    },
};
</script>
