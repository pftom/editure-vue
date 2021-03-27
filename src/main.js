import Vue from "vue";
import { Button, Row, Tooltip, Icon } from "element-ui";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faLink,
  faUnderline,
  faChevronLeft,
  faChevronRight,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
  faAlignCenter,
  faAlignRight,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";

library.add(
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faCode,
  faLink,
  faChevronLeft,
  faChevronRight,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
  faAlignCenter,
  faAlignRight,
  faAlignLeft
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Button);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Icon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
