<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  .app-header-button {
    -webkit-app-region: no-drag;
    cursor: pointer;
    i {
      font-size: 16px;
      padding: 10px;
    }
  }
}
</style>

<template>
  <div class="app-header">
    <AppLogo></AppLogo>
    <div class="app-header-button">
      <DropdownMenu
        className="app-header-dropdown"
        offset="0,5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar :width="30"
          ><span>{{ user && user.nick }}</span></Avatar
        >
      </DropdownMenu>
    </div>
  </div>
</template>
<script lang="ts">
import { State } from "vuex-class";
import AppLogo from "./AppLogo.vue";

import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "AppHeader",
  components: {
    AppLogo
  }
})
export default class AppHeader extends Vue {
  @State private user: any;
  private infoMenu: object[] = [
    { key: "logout", title: "退出登录", icon: "h-icon-outbox" }
  ];
  private trigger() {}
}
</script>
