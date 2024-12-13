import Group from "@/views/Group.vue";
import Members from "@/views/Group/Admin/Members.vue";
import Groups from "@/views/Groups.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Home,
            name: "home",
        },

        {
            path: "/login/vk",
            component: Login,
            name: "login",
        },

        {
            path: "/:groupJoinCode",
            component: Group,
            name: "group",
        },

        {
            path: "/groups",
            component: Groups,
            name: "groups",
        },

        {
            path: "/:groupJoinCode/members",
            component: Members,
            name: "members",
        },
    ],
});

export default router;
