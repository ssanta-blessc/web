<template>
    <div class="bg-secondary-200 p-2 w-full rounded-xl shadow-lg transform transition-transform duration-300 overflow-hidden" :class="{ 'translate-y-0': isAnimating, 'translate-y-full': !isAnimating }" @click.stop>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAnimating: false,
        };
    },
    methods: {
        show() {
            this.isMounted = true;
            setTimeout(() => {
                this.isAnimating = true;
                this.close();
            }, 0);
        },
        close() {
            setTimeout(() => {
                this.isAnimating = false;
            }, 3000);
        },
    },
};
</script>

<style>
.translate-y-full {
    transform: translateY(calc(-70px - 200%));
}
.translate-y-0 {
    transform: translateY(calc(-70px + 100%));
}
</style>
