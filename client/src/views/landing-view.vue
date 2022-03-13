<template>
  <v-row class="ga__home_view" align-content="center">
    <v-col :cols="10" :sm="5" :md="5" class="ga__home_view__left"></v-col>
    <v-col :cols="12" :sm="7" :md="7" class="ga__home_view__right">
      <div class="text-md-h4 grey--text text--darken-1">Here is your</div>
      <div 
        class="text-overline font-weight-light white--text ga__home_view__right__title"
      >
        IPass
      </div>
      <div><v-btn outlined color="teal lighten-2" x-large class="mt-3 mb-3">Sign Up</v-btn></div>
      <div><v-btn outlined color="deep-orange lighten-1" x-large class="mb-3">Log In</v-btn></div>
      <div><v-btn outlined color="yellow lighten-2" x-large>Learn More</v-btn></div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'GALandingView',
  })
</script>

<style lang="scss" scoped>
.ga__home_view {
  margin: 0;
  height: 100%;

  &__left {
    background: linear-gradient(90deg, #4DB6AC 0%, #9FA8DA 25%, #FF7043 50%, #FFF176 100%);
    height: 50%;

    border-top-right-radius: 30% 45%;
    border-bottom-right-radius: 30% 45%;

    @media screen and (max-width: 600px) {
      height: 35%;
      border-top-right-radius: 40% 45%;
      border-bottom-right-radius: 40% 45%;
    }
  }
  &__right {
    text-align: center;
    margin: auto;

    &__title {
      font-size: 6rem !important;

      @media screen and (max-width: 600px) {
        font-size: 4rem !important;
      }
      padding: 5% 0;
    }
  }
}
</style>
