<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import axios from "axios";
import { API_URL, VK_AUTH_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
</script>
<template>
    <div>
        <div class="flex flex-col w-full [&>*+*]:mt-2" ref="container">
            <GroupElementComponent v-for="group in groups" :group-name="group.name" :join-code="group.joinCode" :admin="group.admin" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            groups: [],
            from: 0,
            laoding: false,
            all: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.loadChunk);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.loadChunk);
    },
    methods: {
        getGroups() {
            if (!this.laoding && !this.all) {
                this.laoding = true;
                axios
                    .get(API_URL + "user/groups?from=" + this.from, {
                        headers: {
                            Authorization: localStorage.get("jwt"),
                        },
                    })
                    .then((response) => {
                        let lengthBefore = this.groups.length;
                        this.groups.push.apply(this.groups, response.data.data.info.groups);
                        if (lengthBefore == this.groups.length) {
                            this.all = true;
                        } else {
                            this.from += 21;
                        }

                        this.laoding = false;
                    });
            }
        },
        loadChunk() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight) {
                this.getGroups();
            }
        },
    },
    created() {
        if (!localStorage.has("jwt")) {
            window.location.href = VK_AUTH_URL;
        }
        this.getGroups();
    },
};
</script>
