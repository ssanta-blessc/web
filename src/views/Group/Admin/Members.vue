<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import GroupElementComponent from "@/components/GroupElementComponent.vue";
import MemberElementComponent from "@/components/MemberElementComponent.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import axios from "axios";
import { API_URL, VK_AUTH_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
import { getJwtPayload } from "@/helpers/jwt";
</script>
<template>
    <div>
        <div class="flex flex-col w-full [&>*+*]:mt-2" ref="container">
            <MemberElementComponent @remove-member="removeGroupMember" v-for="member in members" :member-name="member.name" :member-vkid="member.vkid" :removable="true" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            members: [],
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
        getMembers() {
            if (!this.laoding && !this.all) {
                this.laoding = true;
                axios
                    .get(API_URL + "group/" + this.$route.params.groupJoinCode + "/members?from=" + this.from, {
                        headers: {
                            Authorization: localStorage.get("jwt"),
                        },
                    })
                    .then((response) => {
                        let lengthBefore = this.members.length;
                        this.members.push.apply(
                            this.members,
                            response.data.data.info.groupMembers.filter((member) => member.vkid != getJwtPayload(localStorage.get("jwt")).payload.vkid)
                        );
                        if (lengthBefore == this.members.length) {
                            this.all = true;
                        } else {
                            this.from += 21;
                        }

                        this.laoding = false;
                    });
            }
        },
        removeGroupMember(vkid) {
            axios
                .delete(API_URL + "group/" + this.$route.params.groupJoinCode + "/user/vkid/" + vkid, {
                    headers: {
                        Authorization: localStorage.get("jwt"),
                    },
                })
                .then(() => {
                    this.members = this.members.filter((member) => member.vkid != vkid);
                });
        },
        loadChunk() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight) {
                this.getMembers();
            }
        },
    },
    created() {
        if (!localStorage.has("jwt")) {
            window.location.href = VK_AUTH_URL;
        }
        this.getMembers();
    },
};
</script>
