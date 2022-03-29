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
  </div>
</template>

<script lang="ts">
import {
  GA_LEARN_MORE_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
} from "@/config/consts";
import Vue from "vue";

export default Vue.extend({
  name: "ClientAppMenu",

  data() {
    return {
      appMenuLinks: [
        { title: "home", routeName: GA_WELCOME_ROUTE_NAME },
        { title: "login", routeName: GA_LOGIN_ROUTE_NAME },
        { title: "sign up", routeName: GA_SIGNUP_ROUTE_NAME },
        { title: "learn", routeName: GA_LEARN_MORE_ROUTE_NAME },
      ],
    };
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
    async handleAppMenuItemClick(routeName: string) {
      if (this.$route.name !== routeName) {
        await this.$router.push({ name: routeName });
      }
    },
    isLinkSelected(routeName: string) {
      return this.$route.name === routeName;
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
}
</style>
