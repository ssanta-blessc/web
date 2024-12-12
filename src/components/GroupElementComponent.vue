<script setup>
import { APP_NAME } from "@/helpers/config.js";
</script>
<template>
    <a :href="'/' + joinCode" class="p-2 [&_*]:text-ellipsis [&_*]:overflow-hidden [&_*]:whitespace-nowrap px-4 flex items-center justify-between cursor-pointer bg-accent-100 rounded-lg overflow-hidden">
        <div class="flex items-center flex-row-reverse">
            <div class="flex items-center [&>*+*]:ml-2">
                <div class="font-semibold !max-w-[60%]">{{ groupName }}</div>
            </div>
            <svg v-if="admin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 min-h-6 min-w-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
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
        joinCode: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
