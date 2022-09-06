<template>
  <div class="ga__home_logged_in_view">
    <div class="ga__home_logged_in_view__content">
      <v-row class="ga__home_logged_in_view" align-content="center">
        <v-col :cols="10" :sm="5" :md="5" class="ga__home_logged_in_view__left">
          <div class="ga__home_logged_in_view__gradient"></div>
        </v-col>
        <v-col
          :cols="12"
          :sm="7"
          :md="7"
          class="ga__home_logged_in_view__right"
        >
          <div class="text-md-h4 grey--text text--darken-1">
            {{ `here is ${loggedInUser}'s` }}
          </div>
          <div
            class="text-overline font-weight-light white--text ga__home_logged_in_view__right__title"
          >
            IPass
          </div>
          <div>
            <v-badge
              color="teal lighten-2"
              offsetX="50"
              offsetY="20"
              :content="'Coming soon!'"
              overlap
            >
              <v-btn
                disabled
                dark
                color="teal lighten-2"
                x-large
                class="white--text mt-3 mb-3"
                >IPASS MANAGER</v-btn
              >
            </v-badge>
          </div>
          <div>
            <v-btn
              outlined
              color="yellow lighten-2"
              x-large
              class="mb-3"
              @click="handleButtonClick(learnMoreRouteName)"
              >Learn More</v-btn
            >
          </div>
          <div>
            <v-btn
              outlined
              color="deep-orange lighten-1"
              x-large
              @click="handleLogout"
              >Log out</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </div>
    <v-overlay :value="showLeavingViewOverlay" z-index="30" opacity="0.85">
      <div class="ga__home_logged_in_view__overlay__animated">
        <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
      </div>
      <div class="ga__home_logged_in_view__overlay__content">
        <div
          class="text-overline white--text text--lighten-2 ga__home_logged_in_view__overlay__centered"
        >
          Are you sure you want to leave?
        </div>
        <div>
          <v-btn
            class="white--text mr-4"
            outlined
            :color="`red lighten-2`"
            @click="showLeavingViewOverlay = !showLeavingViewOverlay"
          >
            no
          </v-btn>
          <v-btn
            class="white--text"
            outlined
            :color="`green lighten-2`"
            @click="logoutUser"
          >
            yes
          </v-btn>
        </div>
      </div>
    </v-overlay>
    <div class="ga__home_logged_in_view__animated">
      <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// @ts-ignore
import { ParticlesBg } from "particles-bg-vue";

import {
  GA_LEARN_MORE_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
} from "@/config/consts";
import { isLoggedIn } from "@/store/modules/authentication/getters";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "GALoggedInLandingView",
  components: { ParticlesBg },
  data() {
    return {
      learnMoreRouteName: GA_LEARN_MORE_ROUTE_NAME,
      showLeavingViewOverlay: false,
    };
  },

  methods: {
    ...mapActions("authentication", ["fetchLogout"]),

    async handleButtonClick(routeName: string) {
      await this.$router.push({ name: routeName });
    },
    handleLogout() {
      this.showLeavingViewOverlay = !this.showLeavingViewOverlay;
    },
    async logoutUser() {
      this.fetchLogout();
      await this.$router.push({ name: GA_WELCOME_ROUTE_NAME });
    },
  },

  computed: {
    isLoggedIn(): boolean {
      return localStorage.getItem("GA-token") !== null;
    },

    loggedInUser(): string {
      return localStorage.getItem("GA-name") ?? "";
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__home_logged_in_view {
  margin: 0;
  margin-top: -30px;
  height: 100%;

  &__content {
    z-index: 20;
    left: 0px;
    top: 0px;
    height: 100%;
    position: relative;
  }

  &__animated {
    z-index: 1;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  &__left {
    padding-left: 0;
  }

  &__gradient {
    background: conic-gradient(
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 80%,
      #4db6ac 100%
    );

    border-top-right-radius: 30% 50%;
    border-bottom-right-radius: 30% 50%;

    @media screen and (max-width: 600px) {
      height: 35%;
      border-top-right-radius: 40% 50%;
      border-bottom-right-radius: 40% 50%;
    }

    width: 100%;
    height: 100%;
  }

  &__right {
    text-align: center;
    margin: auto;
    padding-top: 2.5%;
    padding-bottom: 2.5%;

    &__title {
      font-size: 6rem !important;

      @media screen and (max-width: 600px) {
        font-size: 4rem !important;
      }
      padding: 5% 0;
    }
  }

  &__overlay {
    &__content {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      z-index: 20;
      left: 0px;
      top: 0px;
      height: 100%;
      position: relative;
    }

    &__animated {
      z-index: 1;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      position: fixed;
    }

    &__centered {
      text-align: center;
    }
  }
}
</style>
