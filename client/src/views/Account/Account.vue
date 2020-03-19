<template>
  <div class="page-account">
    <router-view class="view-container"></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Account"
})
export default class Account extends Vue {}
</script>
