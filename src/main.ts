import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vant from "./plugins/vant";
import "amfe-flexible";

const app = createApp(App);
// 按需注入vant组件
Object.values(vant).forEach((key) => app.use(key));

app.use(store).use(router).mount("#app");
