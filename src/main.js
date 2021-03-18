import Vue from "vue";
import { Button, Row, Tooltip } from "element-ui";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faLink,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";

library.add(faBold, faItalic, faStrikethrough, faUnderline, faCode, faLink);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Button);
Vue.use(Row);
Vue.use(Tooltip);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
