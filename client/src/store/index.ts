import Vue from "vue";
import Vuex from "vuex";
import { setToken } from "../factory";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siderCollapsed: false,
    user: (() => {
      let user: any = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        if (+new Date() - user.lts > user.expires) {
          user = null;
        }
      }
      // user = null; // @NOTE 测试
      if (user) {
        setToken(user.token);
      }
      return user;
    })()
  },
  mutations: {
    loginUser(state, user) {
      setToken(user ? user.token : "");
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    }
  },
  actions: {
    loginUser({ commit }, user) {
      commit("loginUser", user);
    }
  },
  modules: {}
});
