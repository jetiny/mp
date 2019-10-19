<template>
<div class="page-product">
  <router-view class="view-container"></router-view>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Product'
})
export default class Product extends Vue {
}
</script>
