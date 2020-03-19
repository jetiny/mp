<template>
  <div class="page-iteration">
    <router-view class="view-container"></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Iteration"
})
export default class Iteration extends Vue {}
</script>
