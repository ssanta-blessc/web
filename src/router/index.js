import Group from "@/views/Group.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Home,
        },

        {
            path: "/login/vk",
        },

        {
            path: "/:groupJoinCode",
            component: Group,
        },

        {
            path: "/groups",
        },
    ],
});

export default router;
