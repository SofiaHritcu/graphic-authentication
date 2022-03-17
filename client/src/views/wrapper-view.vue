<template>
  <v-container fluid class="ga__wrapper-view__container">
    <router-view />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GAWrapperView',
  
});
</script>

<style lang="scss" scoped>
.ga__wrapper-view__container {
  height: 100%;
  padding: 0;
}
</style>
