<template>
  <div class="view-team-add-team">
    <header class="h-modal-header">
      {{ "创建产品" }}
    </header>
    <Form
      :model="item"
      ref="form"
      :rules="rules"
      v-width="400"
      :showErrorTip="true"
    >
      <FormItem label="产品名称" prop="title" :required="true">
        <input type="text" v-model="item.title" />
      </FormItem>
      <FormItem label="产品描述" prop="description" :required="true">
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
  name: "TeamAddProduct"
})
export default class TeamAddProduct extends Vue {
  @Prop()
  private team!: any;
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
      let res = await this.$api.Team.CreateProduct({
        team: this.team.id,
        ...this.item
      });
      this.$Message("保存成功");
      this.$emit("success");
      this.$emit("close");
    }
  }
  async close() {
    this.$emit("close");
  }
}
</script>
