<template>
    <div>
        <div class="p-2 flex flex-col rounded-xl min-h-5 bg-secondary-200">
            <slot name="title"></slot>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
    },
};
</script>
