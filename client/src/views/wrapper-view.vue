<template>
  <v-container fluid class="ga__wrapper-view__container">
    <landing-view />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import LandingView from './landing-view.vue';

export default Vue.extend({
  name: 'GAWrapperView',
  components: {
    LandingView,
  }
});
</script>

<style lang="scss" scoped>
.ga__wrapper-view__container {
  height: 100%;
  padding: 0;
}
</style>
