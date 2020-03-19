<template>
  <div class="view-iteration-edit-iteration">
    <header class="h-modal-header">
      {{ "编辑迭代" }}
    </header>
    <Form
      :model="item"
      ref="form"
      :rules="rules"
      v-width="400"
      :showErrorTip="true"
    >
      <FormItem label="迭代名称" prop="title" :required="true">
        <input type="text" v-model="item.title" />
      </FormItem>
      <FormItem label="迭代版本" prop="title" :required="true">
        <input type="text" v-model="item.version" />
      </FormItem>
      <FormItem label="迭代描述" prop="description" :required="true">
        <textarea type="text" v-model="item.description" />
      </FormItem>
      <FormItem label="预计开始" prop="prepareStartDate" :required="true">
        <DatePicker
          v-model="item.prepareStartDate"
          placeholder="请选择开始日期"
          :option="{ end: item.prepareEndDate }"
        ></DatePicker>
      </FormItem>
      <FormItem label="预计结束" prop="prepareEndDate" :required="true">
        <DatePicker
          v-model="item.prepareEndDate"
          placeholder="请选择开始日期"
          :option="{ start: item.prepareStartDate }"
        ></DatePicker>
      </FormItem>
      <FormItem :no-padding="true">
        <Button color="primary" @click="submit">提交</Button>
        <button class="h-btn" @click="close">关闭</button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "IterationEditIteration"
})
export default class IterationEditIteration extends Vue {
  @Prop()
  private product!: object;
  @Prop({
    type: Object,
    default: () => {
      return {
        title: "",
        description: "",
        version: "",
        prepareStartDate: null,
        prepareEndDate: null
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
      let res = await this.$api.Iteration.UpdateIteration({
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
