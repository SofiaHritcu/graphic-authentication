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
      <div>
        <v-btn
          outlined
          color="teal lighten-2"
          x-large
          class="mt-3 mb-3"
          @click="handleButtonClick(signupRouteName)"
          >Sign Up</v-btn
        >
      </div>
      <div>
        <v-btn
          outlined
          color="deep-orange lighten-1"
          x-large
          class="mb-3"
          @click="handleButtonClick(loginRouteName)"
          >Log In</v-btn
        >
      </div>
      <div>
        <v-btn
          outlined
          color="yellow lighten-2"
          x-large
          @click="handleButtonClick(learnMoreRouteName)"
          >Learn More</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {
  GA_SIGNUP_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_LEARN_MORE_ROUTE_NAME,
} from "@/config/consts";

export default Vue.extend({
  name: "GALandingView",
  data() {
    return {
      signupRouteName: GA_SIGNUP_ROUTE_NAME,
      loginRouteName: GA_LOGIN_ROUTE_NAME,
      learnMoreRouteName: GA_LEARN_MORE_ROUTE_NAME,
    };
  },

  methods: {
    async handleButtonClick(routeName: string) {
      await this.$router.push({ name: routeName });
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__home_view {
  margin: 0;
  height: 100%;

  &__left {
    background: linear-gradient(
      90deg,
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 100%
    );
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
