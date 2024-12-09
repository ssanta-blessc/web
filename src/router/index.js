import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
        },

        {
            path: "/login/vk",
        },

        {
            path: "/:groupJoinCode",
        },

        {
            path: "/groups",
        },
    ],
});

export default router;
