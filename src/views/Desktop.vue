<script setup lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
</script>

<template>
    <div>
        <ModalComponent ref="groupClosed" type="Middle" class="[&>*]:mx-4" :closable="false">
            <div class="flex flex-col w-full">
                <div class="mb-4 flex justify-center items-center">
                    <div class="font-semibold text-lg text-text-dark">Приложение доступно только на мобильных устройствах.</div>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>
