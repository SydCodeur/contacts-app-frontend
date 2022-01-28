import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// vue3-tel-input npm package
import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
const VueTelInputOptions = {
  mode: "international",
};

//

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import router from "./router";

window.baseurl = "http://localhost:3000/api/v1";

// window.baseurl = "https://my-contacts-api-v1.herokuapp.com/api/v1";

createApp(App)
  .use(VueTelInput, VueTelInputOptions)
  .use(router)
  .use(store)
  .mount("#app");
