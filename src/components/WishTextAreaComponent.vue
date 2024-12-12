<script setup lang="js">
import { API_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
import axios from "axios";
import ButtonComponent from "./ButtonComponent.vue";
</script>
<template>
    <div>
        <div class="text-secondary-100">{{ title }}</div>
        <div class="w-full flex flex-grow flex-col cursor-text border duration-75 border-secondary-100 p-2 rounded-lg focus-within:bg-secondary-100/5">
            <textarea @input="inputHandler" type="text" class="w-full mb-5 flex-grow cursor-default placeholder:text-secondary-100/50" :disabled="disabled" :placeholder="placeholder" ref="textarea" v-model="wish" />
            <ButtonComponent @click="saveWish" type="Secondary" title="Сохранить" class="rounded-md" :disabled="!(wish.length > 0)" />
        </div>
    </div>
</template>

<script lang="js">
export default {
    data() {
        return {
            title: "0/4000",
            wish: ''
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    methods: {
        inputHandler(e){
            this.title = this.$refs.textarea.value.length + "/4000"
        },
        saveWish(){
            if(this.wish.length > 0){
                axios.patch(API_URL + "group/" + this.$route.params.groupJoinCode + '/wish',
                {
                    'wish': this.wish
                },
                {
                    headers: {
                        Authorization: localStorage.get("jwt"),
                    },
                })
            }
        }
    },
    created() {
        axios
            .get(API_URL + "group/" + this.$route.params.groupJoinCode + '/wish', {
                headers: {
                    Authorization: localStorage.get("jwt"),
                },
            })
            .then((response) => {
                this.wish = response.data.data.info.wish == null ? '' : response.data.data.info.wish
            });
    },
};
</script>
