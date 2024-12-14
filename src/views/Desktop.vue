<script setup>
import ModalComponent from "@/components/ModalComponent.vue";
</script>

<template>
    <div>
        <ModalComponent ref="accessDeny" type="Middle" class="[&>*]:mx-4" :closable="false">
            <div class="flex flex-col w-full">
                <div class="flex justify-center items-center">
                    <div class="font-semibold text-lg text-text-dark text-center">Приложение доступно только на мобильных устройствах.</div>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$refs.accessDeny.open();
    },
};
</script>
