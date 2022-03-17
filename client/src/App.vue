<template>
  <v-app class="app">
    <v-main class="blue-grey darken-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  min-height: 100%;
}
</style>