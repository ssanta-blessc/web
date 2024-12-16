<template>
    <div v-if="isMounted" :class="{ '!bg-opacity-40': isAnimating, 'items-end': type == 'Bottom', 'items-center': type == 'Middle' }" class="min-w-[100vw] fixed inset-0 z-50 flex justify-center bg-black bg-opacity-0 duration-200" @click="handleOverlayClick">
        <div v-if="type == 'Bottom'" class="bg-secondary-200 p-2 w-full rounded-t-xl mx-2 shadow-lg transform transition-transform duration-500 overflow-hidden translate-y-[100%]" :class="{ '!translate-y-0 !duration-300': isAnimating }" @click.stop>
            <slot></slot>
        </div>
        <div v-if="type == 'Middle'" class="bg-secondary-200 p-2 w-full rounded-xl mx-2 shadow-lg transform transition-transform duration-500 ease-out overflow-hidden" :class="{ ' translate-x-[100vw]': !isAnimating }" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMounted: false,
            isAnimating: false,
        };
    },
    props: {
        closable: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: "Bottom",
        },
    },
    methods: {
        open() {
            this.isMounted = true;
            setTimeout(() => {
                this.isAnimating = true;
                document.body.style.overflow = "hidden";
            }, 0);
        },
        close() {
            this.isAnimating = false;
            setTimeout(() => {
                this.isMounted = false;
                document.body.style.overflow = "";
            }, 500);
        },
        handleOverlayClick(event) {
            if (this.closable) {
                this.close();
            }
        },
    },
    beforeDestroy() {
        document.body.style.overflow = "";
    },
    beforeUnmount() {
        document.body.style.overflow = "";
    },
};
</script>
