import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "@/config/icons";

Vue.config.productionTip = false;

// setting up the default vue http module for api calls
Vue.prototype.$http = axios;

// load the token from local storage
const gaToken = localStorage.getItem("GA-token");
// check if the token exists => then update axios authorization headers
if (gaToken) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = gaToken;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h: any) => h(App),
}).$mount("#app");
