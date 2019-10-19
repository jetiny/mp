<template>
<div class="view-account-login">
  <Form :model="model" v-width="400" :style="{margin: '0 auto'}">
    <FormItem label="用户名">
      <template v-slot:label><i class="h-icon-user"></i> 用户名</template>
      <input type="text" v-model="model.username">
    </FormItem>
    <FormItem label="密码" icon="h-icon-complete">
      <input type="password" v-model="model.password">
    </FormItem>
    <FormItem>
      <Button color="primary" @click="submit">提交</Button>
    </FormItem>
  </Form>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'AccountLogin'
})
export default class AccountLogin extends Vue {
  private model =  {
    username: 'u1',
    password: 'x'
  }
  async submit () {
    let res = await this.$api.User.Login(this.model)
    console.log(res)
  }
}
</script>
<style lang="scss" scoped>
  .view-account-login {
    margin-top: 300px;
  }
</style>