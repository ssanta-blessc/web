<template>
    <div>
        <div v-if="title != ''">{{ title }}:</div>
        <div class="w-full h-full cursor-text border duration-300 border-text-100 p-1 px-2 rounded-lg focus-within:bg-text-dark/5">
            <input @input="$emit('update:value', $event.target.value)" type="text" class="w-full h-full cursor-default placeholder:text-text-100/50" :disabled="disabled" :value="value" :placeholder="placeholder" />
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
