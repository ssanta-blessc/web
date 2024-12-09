<template>
    <div :class="{ 'bg-primary-100 active:bg-primary-100/70': type == 'Primary', 'bg-accent-100 active:bg-accent-100/70': type == 'Secondary' }" class="p-1 duration-[.05s] flex items-center justify-center cursor-pointer rounded-lg" @click="changeLocation" @touchstart="changeLocation">
        {{ title }}
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "Primary",
        },
        title: {
            type: String,
            default: "Primary Button",
        },
    },
};
</script>
