<template>
    <div :class="{ 'bg-primary-100': type == 'Primary', 'active:bg-primary-100/70': type == 'Primary' && !disabled, 'bg-accent-100': type == 'Secondary', 'active:bg-accent-100/70': type == 'Secondary' && !disabled, 'bg-opacity-40': disabled }" class="p-1 duration-[.05s] flex items-center justify-center cursor-pointer rounded-lg" @click="changeLocation" @touchstart="changeLocation">
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
