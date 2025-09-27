import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaTasks, FaArrowLeft, FaPlus } from "oh-vue-icons/icons";
import "./assests/app.css";

addIcons(FaTasks, FaArrowLeft, FaPlus);
const queryClient = new QueryClient();

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.component("v-icon", OhVueIcon);
app.mount("#app");
