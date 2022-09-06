<template>
  <div class="ga__app_menu mb-4">
    <v-btn
      outlined
      :color="`${color} darken-2`"
      :key="link.title"
      :class="[
        'ga__app_menu__link',
        { 'ga__app_menu__link--selected': isLinkSelected(link.routeName) },
        'ml-2',
      ]"
      v-for="link in appMenuLinks"
      @click="handleAppMenuItemClick(link.routeName)"
    >
      {{ link.title }}
    </v-btn>
    <v-btn
      v-if="isLoggedIn"
      outlined
      :color="`${color} darken-2`"
      :class="['ga__app_menu__link', 'ml-2']"
      @click="handleLogout"
    >
      logout
    </v-btn>
    <v-overlay :value="showLeavingViewOverlay" z-index="0" opacity="0.85">
      <div class="ga__app_menu__overlay__animated">
        <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
      </div>
      <div class="ga__app_menu__overlay__content">
        <div
          class="text-overline white--text text--lighten-2 ga__app_menu__overlay__centered"
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
  </div>
</template>

<script lang="ts">
import {
  GA_LEARN_MORE_ROUTE_NAME,
  GA_LOGGED_WELCOME_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
} from "@/config/consts";
import Vue from "vue";
import { mapActions } from "vuex";
// @ts-ignore
import { ParticlesBg } from "particles-bg-vue";

export default Vue.extend({
  components: { ParticlesBg },
  name: "ClientAppMenu",

  data() {
    return { showLeavingViewOverlay: false };
  },

  props: {
    /**
     * this prop refers to the color of the app menu items
     */
    color: {
      type: String,
      required: false,
      default: "white",
    },
  },

  methods: {
    ...mapActions("authentication", ["fetchLogout"]),

    async handleAppMenuItemClick(routeName: string) {
      if (this.$route.name !== routeName) {
        await this.$router.push({ name: routeName });
      }
    },
    isLinkSelected(routeName: string) {
      return this.$route.name === routeName;
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

    appMenuLinks() {
      if (!this.isLoggedIn) {
        return [
          { title: "home", routeName: GA_WELCOME_ROUTE_NAME },
          { title: "login", routeName: GA_LOGIN_ROUTE_NAME },
          { title: "sign up", routeName: GA_SIGNUP_ROUTE_NAME },
          { title: "learn", routeName: GA_LEARN_MORE_ROUTE_NAME },
        ];
      }

      return [{ title: "home", routeName: GA_LOGGED_WELCOME_ROUTE_NAME }];
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__app_menu {
  &__link {
    border-top: transparent;
    border-left: transparent;
    border-right: transparent;
    width: auto;
    opacity: 0.5;

    @media screen and (max-width: 600px) {
      padding: 0 8px !important;
    }
  }

  &__link--selected {
    opacity: 1;
  }

  &__link--selected:hover {
    cursor: default;
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
