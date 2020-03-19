<template>
  <div class="page-task">
    <router-view class="view-container"></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Task"
})
export default class Task extends Vue {}
</script>
