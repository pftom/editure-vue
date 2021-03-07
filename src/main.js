import Vue from "vue";
import { Button, Row, Tooltip } from "element-ui";
import App from "./App.vue";

Vue.use(Button);
Vue.use(Row);
Vue.use(Tooltip);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
