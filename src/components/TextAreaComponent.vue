<script setup lang="js">
import { useTextareaAutosize } from "@vueuse/core";

const { textarea, input } = useTextareaAutosize();
</script>
<template>
    <div>
        <div v-if="title != ''" class="text-secondary-100">{{ title }}:</div>
        <div class="w-full flex flex-col cursor-text border duration-75 border-secondary-100 p-2 rounded-lg focus-within:bg-secondary-100/5">
            <textarea type="text" class="w-full mb-5 cursor-default placeholder:text-secondary-100/50" :disabled="disabled" :placeholder="placeholder" ref="textarea" v-model="input" />
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="js">
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
        placeholder: {
            type: String,
            default: "",
        },
    },
};
</script>
