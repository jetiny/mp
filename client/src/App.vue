<template>
  <div id="app">
    <AppLayout />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppLayout from "./layout/AppLayout.vue";

@Component({
  components: {
    AppLayout
  }
})
export default class App extends Vue {
  created() {
    // console.log(this.$api.User.Login())
  }
}
</script>
