<template>
  <div class="view-team-add-team">
    <header class="h-modal-header">
      {{ isEdit ? "编辑团队" : "创建团队" }}
    </header>
    <Form
      :model="item"
      ref="form"
      :rules="rules"
      v-width="400"
      :showErrorTip="true"
    >
      <FormItem label="团队名称" prop="title" :required="true">
        <input type="text" v-model="item.title" />
      </FormItem>
      <FormItem label="团队描述" prop="description" :required="true">
        <textarea type="text" v-model="item.description" />
      </FormItem>
      <FormItem :no-padding="true">
        <Button color="primary" @click="submit">提交</Button>
        <button class="h-btn" @click="close">关闭</button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";
@Component({
  name: "TeamAddTeam"
})
export default class TeamAddTeam extends Vue {
  @Prop({ type: Boolean, default: Boolean })
  private isEdit!: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {
        title: "",
        description: ""
      };
    }
  })
  private item!: object;
  private rules: object = {};
  async submit() {
    let from: any = this.$refs.form;
    from.resetValid();
    let validResult = from.valid();
    if (validResult.result) {
      if (this.isEdit) {
        await this.$api.Team.UpdateTeam(Object.assign({}, this.item));
      } else {
        await this.$api.Team.CreateTeam(this.item);
      }
      this.$Message("创建成功");
      this.$emit("success");
      this.$emit("close");
    }
  }
  async close() {
    this.$emit("close");
  }
}
</script>
