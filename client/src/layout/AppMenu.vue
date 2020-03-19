<template>
  <div class="app-menu">
    <Menu
      :datas="menus"
      :inlineCollapsed="siderCollapsed"
      @click="trigger"
      ref="menu"
      :className="`h-menu-${theme}`"
    ></Menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  components: {}
})
export default class AppMenu extends Vue {
  public $refs!: {
    menu: HTMLFormElement;
  };
  @State private siderCollapsed!: boolean;
  @Prop({ type: String, default: "white" }) private readonly theme!: string;
  private menus: object[] = [
    { title: "我的团队", key: "TeamListTeam", icon: "h-icon-users" },
    { title: "我的产品", key: "ProductListProduct", icon: "h-icon-edit" },
    {
      title: "我的迭代",
      key: "IterationListIteration",
      icon: "h-icon-calendar"
    },
    { title: "我的任务", key: "TaskListTask", icon: "h-icon-task" }
  ];
  private mounted() {
    this.$nextTick(() => {
      this.menuSelect();
    });
  }
  private trigger(data: any) {
    if (data.children.length > 0) {
      return;
    }
    if (this.$route.name !== data.key) {
      this.$router.push({ name: data.key });
    }
  }
  private menuSelect(): void {
    if (this.$route.name) {
      this.$refs.menu.select(this.$route.name);
    }
  }
}
</script>
