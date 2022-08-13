<template>
  <v-container fluid class="ga__wrapper-view__container mt-10">
    <router-view />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GAWrapperView",
});
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.ga__wrapper-view__container {
  height: calc(100% - 40px);
  padding: 0;
}
</style>
