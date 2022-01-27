import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import router from "./router";

window.baseurl = "http://localhost:3000/api/v1";

createApp(App).use(router).use(store).mount("#app");
