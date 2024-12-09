<script setup>
import LogoComponent from "@/components/LogoComponent.vue";
</script>
<template>
    <div class="header wrapper-base wrapper-1280 !pb-0">
        <div class="h-[70px] pt-[9px] [&>*+*]:ml-5 flex w-full">
            <LogoComponent class="flex" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            debounceTimeout: null, // Переменная для хранения timeout
        };
    },
    methods: {
        search() {
            this.$refs.search.focus();
        },
        onInputChange(event) {
            // Очистить предыдущий таймер, если он существует
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            // Создаём новый таймер, чтобы отправить текст через 500 мс
            this.debounceTimeout = setTimeout(() => {
                // Отправляем текст в родительский компонент через событие
                this.$emit("search-text-changed", event.target.value);
            }, 500); // Задержка 500 мс
        },
    },
};
</script>
