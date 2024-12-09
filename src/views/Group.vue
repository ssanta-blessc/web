<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import WishTextAreaComponent from "@/components/WishTextAreaComponent.vue";
import { APP_DOMAIN } from "@/helpers/config";
</script>
<template>
    <div>
        <div class="flex flex-col w-full h-full">
            <div class="text-2xl text-secondary-100 font-bold mb-4 text-ellipsis overflow-hidden whitespace-nowrap">Группа тайный санта</div>
            <div v-if="admin && !closed">
                <div class="top flex flex-col">
                    <WishTextAreaComponent placeholder="Ваше желание">
                        <template v-slot:content>
                            <ButtonComponent type="Secondary" title="Сохранить" class="rounded-md" />
                        </template>
                    </WishTextAreaComponent>
                </div>
                <div class="flex flex-col justify-start">
                    <div class="my-5">
                        <div class="text-secondary-100">Нажмите что бы скопировать ссылку:</div>
                        <div class="p-2 bg-secondary-100/20 rounded-lg flex items-center active:bg-secondary-100/50 duration-100">
                            {{ APP_DOMAIN + "/Hwf1g6qGX75ijYgJ" }}
                        </div>
                    </div>
                    <BlockComponent>
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg">Участники</div>
                        </template>
                        <template v-slot:content>
                            <div class="[&>*+*]:mt-2">
                                <MemberElementComponent member-name="Алексей Гузиков" />
                                <MemberElementComponent member-name="Василий Пешиков" />
                                <MemberElementComponent member-name="Александ Осипенко" />
                                <ButtonComponent type="Secondary" title="Все участники" class="p-2" />
                            </div>
                        </template>
                    </BlockComponent>
                    <ButtonComponent type="Primary" title="Начать игру" class="p-2 mt-4" />
                </div>
            </div>
            <div v-if="!admin">
                <WishTextAreaComponent v-if="!closed" placeholder="Ваше желание" class="h-[500px]">
                    <template v-slot:content>
                        <ButtonComponent type="Secondary" title="Сохранить" class="rounded-md" />
                    </template>
                </WishTextAreaComponent>
                <div v-if="closed">
                    <BlockComponent class="mb-5">
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg text-text-dark">Вашему подарку нашелся получатель!</div>
                        </template>
                        <template v-slot:content>
                            <MemberElementComponent member-name="Алексей Гузиков" :removable="false" />
                        </template>
                    </BlockComponent>
                    <BlockComponent>
                        <template v-slot:title>
                            <div class="pb-2 w-full font-semibold text-lg text-text-dark">Что хочет получить в подарок:</div>
                        </template>
                        <template v-slot:content>
                            <div class="text-text-dark">Я хочу машину черную и хуйню</div>
                        </template>
                    </BlockComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            admin: false,
            closed: true,
        };
    },
};
</script>
