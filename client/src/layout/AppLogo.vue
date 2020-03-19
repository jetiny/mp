<style lang="scss" scoped>
$layout-header-height: 40px;
.app-logo {
  font-family: Futura, Helvetica Neue For Number, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  padding: 0px 24px;
  line-height: $layout-header-height;
  height: $layout-header-height;
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.3s;
  .app-logo-text {
    font-size: 20px;
    vertical-align: middle;
  }
}
.h-layout-sider-collapsed {
  .app-logo-text {
    display: none;
  }
  .app-logo-icon {
    margin-left: 15px;
  }
}
</style>
<template>
  <div class="app-logo">
    <span class="app-logo-text">产品任务管理</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppLogo extends Vue {}
</script>
