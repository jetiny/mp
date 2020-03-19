<template>
  <div class="page-team">
    <router-view class="view-container"></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Team"
})
export default class Team extends Vue {}
</script>
