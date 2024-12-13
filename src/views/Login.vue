<script setup>
import { API_URL } from "@/helpers/config";
import localStorage from "@/helpers/localStorage";
import axios from "axios";
</script>
<script>
export default {
    created() {
        if (localStorage.has("jwt")) {
            this.$router.push("/");
            return;
        }
        if (!this.$route.query.code) {
            this.$router.push("/");
            return;
        }
        axios.get(API_URL + "auth/vk?code=" + this.$route.query.code).then((response) => {
            localStorage.add("jwt", response.data.data.info.token);
            this.$router.push("/");
        });
    },
};
</script>
