<template>
    <div class="flex items-center justify-center w-10 h-10 border-2 border-secondary-100 text-secondary-100 text-lg font-bold rounded-full">
        {{ number }}
    </div>
</template>

<script>
export default {
    name: "NumberBadge",
    props: {
        number: {
            required: true,
        },
    },
};
</script>
