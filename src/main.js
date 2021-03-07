import Vue from "vue";
import { Button, Row, Tooltip, Icon } from "element-ui";
import App from "./App.vue";

Vue.use(Button);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Icon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
