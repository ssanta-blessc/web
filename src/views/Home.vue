<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
</script>
<template>
    <div class="h-screen">
        <div class="flex flex-col w-full h-full justify-between">
            <div class="my-5">
                <div class="text-2xl text-secondary-100 font-bold mb-4">Как играть?</div>
                <div class="[&>*+*]:mt-4 [&>*>*+*]:ml-4">
                    <div class="flex items-center">
                        <CountComponent number="1" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Откройте группу ниже или нажмите «Создать группу».</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="2" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Отправьте сслыку-приглашение или QR-Код дрзьям что бы они могли присоедениться к группе.</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="3" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Когда все присоеденились и написали желания, нажмите «Начать игру»</div>
                    </div>
                    <div class="flex items-center">
                        <CountComponent number="4" class="!size-8 min-h-8 min-w-8" />
                        <div class="text-secondary-100">Подарите подарок!</div>
                    </div>
                </div>
            </div>
            <BlockComponent>
                <template v-slot:title>
                    <div class="pb-2 w-full font-semibold text-lg">Ваши группы</div>
                </template>
                <template v-slot:content>
                    <div class="[&>*+*]:mt-2">
                        <GroupElementComponent group-members-count="10" group-name="Группа тайнццццццццццццццццый санта" />
                        <GroupElementComponent group-members-count="4" group-name="Группа друзей" />
                        <GroupElementComponent group-members-count="5" group-name="Тайный санта" />
                        <ButtonComponent type="Secondary" title="Загрузить ещё" class="p-2" />
                        <ButtonComponent type="Primary" title="Создать группу" class="p-2" />
                    </div>
                </template>
            </BlockComponent>
        </div>
    </div>
</template>

<script>
export default {};
</script>
