<template>
<div class="page-project">
  <router-view class="view-container"></router-view>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Project'
})
export default class Project extends Vue {
}
</script>
