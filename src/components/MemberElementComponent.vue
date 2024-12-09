<template>
    <div class="p-2 [&_*]:text-ellipsis [&_*]:overflow-hidden [&_*]:whitespace-nowrap px-4 flex items-center justify-between bg-accent-100 rounded-lg active:bg-accent-100/70 overflow-hidden">
        <div class="flex items-center [&>*+*]:ml-2">
            <div class="font-semibold !max-w-[60%]">{{ memberName }}</div>
        </div>
        <svg v-if="removable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 active:bg-secondary-100/20 rounded-lg duration-100 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 min-w-6 min-h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        memberName: {
            type: String,
            required: true,
        },
        memberVkid: {
            type: BigInt64Array,
            required: true,
        },
        removable: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
