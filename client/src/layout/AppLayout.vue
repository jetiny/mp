<style lang="scss" scoped>
.app-layout.is-logined {
  .app-layout-content {
    padding: 0 30px;
    height: calc(100vh - 75px);
    overflow: auto;
  }
}
</style>
<template>
  <div class="app-layout" :class="{ 'is-logined': !!user }">
    <Layout
      :headerFixed="layoutConfig.headerFixed"
      :siderCollapsed="siderCollapsed"
    >
      <HHeader theme="white" v-if="user">
        <AppHeader></AppHeader>
      </HHeader>
      <Layout :siderFixed="layoutConfig.siderFixed">
        <Sider :theme="layoutConfig.siderTheme" v-if="user">
          <AppMenu :theme="layoutConfig.siderTheme"></AppMenu>
        </Sider>
        <Content class="app-layout-content">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import AppHeader from "./AppHeader.vue";
import AppMenu from "./AppMenu.vue";

interface ApplayoutLayoutConfig {
  headerFixed: boolean;
  siderFixed: boolean;
  siderTheme: string;
}
@Component({
  components: {
    AppHeader,
    AppMenu
  }
})
export default class Applayout extends Vue {
  @State private siderCollapsed!: boolean;
  @State private user!: any;
  private layoutConfig: ApplayoutLayoutConfig = {
    headerFixed: true,
    siderFixed: true,
    siderTheme: "white"
  };
  private breadCrumbDatas: object[] = [];
  /** start: lifecycle diagram */
  private mounted() {
    // console.log(this.$route)
  }
  /** start: watch */
  @Watch("siderFixed")
  private siderFixed() {
    if (!this.siderFixed) {
      this.layoutConfig.headerFixed = false;
    }
  }
  @Watch("$route", { immediate: true, deep: true })
  private changeRouter(val: any) {
    const routersBread = Object.assign([], this.$route.matched);
    const breadCrumbDatas = [];
    for (const bread of routersBread) {
      if (Object.keys(bread.meta).length) {
        const obj: any = {};
        obj.title = bread.meta.title;
        obj.path = bread.path;
        breadCrumbDatas.push(obj);
      }
    }
    this.breadCrumbDatas = breadCrumbDatas;
  }
}
</script>
