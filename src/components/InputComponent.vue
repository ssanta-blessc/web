<template>
    <div>
        <div v-if="title != ''">{{ title }}:</div>
        <div class="w-full h-full cursor-text border duration-75 border-secondary-100 p-1 px-2 rounded-lg focus-within:bg-secondary-100/5">
            <input type="text" class="w-full h-full cursor-default" :disabled="disabled" :value="value" :placeholder="placeholder" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
};
</script>
