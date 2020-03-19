import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import routes from "./router";
import VueRouter from "vue-router";
import { install } from "./factory";
import { formatDate, mapTeamUserRole, mapProductUserRole, mapTaskStatus } from "./utils";
import "./css/common.scss";

Vue.config.productionTip = false;

Vue.filter("formatDate", (value: Date, fmt: string) => {
  return formatDate(fmt, value);
});

Vue.filter("mapTeamUserRole", mapTeamUserRole);

Vue.filter("mapProductUserRole", mapProductUserRole);
Vue.filter("mapTaskStatus", mapTaskStatus);

let router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: {
        name: "TeamListTeam"
      }
    },
    ...routes
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name === "AccountLogin") {
    return next();
  }
  if (!store.state.user) {
    return next({ name: "AccountLogin" });
  }
  next();
});

install(Vue).then(() => {
  (window as any).store = store;
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#app");
});
