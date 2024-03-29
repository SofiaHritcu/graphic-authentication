<template>
  <div class="ga__login_view">
    <app-menu color="orange" />
    <v-row
      class="ga__login_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div class="text-md-h5 grey--text text--darken-1">Choose an</div>
        <div
          class="text-overline font-weight-light white--text ga__login_view__title__text"
          @click="handleIPassClick"
        >
          IPass
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__login_view__auth_cards" align-content="center">
      <v-col
        v-for="card in cards"
        :key="card.colorClass"
        :cols="6"
        :xs="6"
        :sm="3"
        :md="3"
        class="ga__login_view__auth_cards__container"
      >
        <v-card
          :class="[
            'ga__login_view__auth_cards__card',
            `ga__login_view__auth_cards__card--${card.colorClass}`,
          ]"
        >
          <v-avatar
            :size="avatarSize"
            color="white"
            class="ga__login_view__auth_cards__card__avatar"
          >
            <img :src="card.avatar" />
          </v-avatar>
          <v-card-text
            class="text-overline ga__login_view__auth_cards__card__title"
          >
            {{ card.title }}
          </v-card-text>
          <div class="ga__login_view__auth_cards__card__actions">
            <v-btn
              outlined
              :color="`${card.colorClass} darken-2`"
              @click="handleAuthCardClick(card.authMethod)"
              class="ga__login_view__auth_cards__card__button"
            >
              Login
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  GA_LOGGED_IN_ROUTE_NAME,
  GA_LOGIN_DRAWING_ROUTE_NAME,
  GA_LOGIN_FACE_RECOGN_ROUTE_NAME,
  GA_LOGIN_ICON_ROUTE_NAME,
  GA_LOGIN_PASS_POINTS_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
} from "@/config/consts";
import appMenu from "@/components/ui/app-menu.vue";

export default Vue.extend({
  components: { appMenu },
  name: "GALoginView",

  data() {
    return {
      cards: [
        {
          title: "Icon Pass",
          // @ts-ignore
          avatar: require("@/assets/icon_pass.png"),
          colorClass: "teal",
          authMethod: GA_LOGIN_ICON_ROUTE_NAME,
        },
        {
          title: "Face Recognition Pass",
          // @ts-ignore
          avatar: require("@/assets/face_recogn_pass.png"),
          colorClass: "indigo",
          authMethod: GA_LOGIN_FACE_RECOGN_ROUTE_NAME,
        },
        {
          title: "Drawing Pass",
          // @ts-ignore
          avatar: require("@/assets/drawing_pass.png"),
          colorClass: "deep-orange",
          authMethod: GA_LOGIN_DRAWING_ROUTE_NAME,
        },
        {
          title: "Points Pass",
          // @ts-ignore
          avatar: require("@/assets/points_pass.png"),
          colorClass: "amber",
          authMethod: GA_LOGIN_PASS_POINTS_ROUTE_NAME,
        },
      ],
    };
  },

  computed: {
    avatarSize(): number {
      return this.$vuetify.breakpoint.name === "sm" ||
        this.$vuetify.breakpoint.name === "xs"
        ? 120
        : 200;
    },
  },

  methods: {
    async handleAuthCardClick(authMethod: string) {
      await this.$router.push({ name: authMethod });
    },
    async handleIPassClick() {
      await this.$router.push({ name: GA_WELCOME_ROUTE_NAME });
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__login_view {
  height: 100%;
  &__title {
    text-align: center;
    &__text {
      font-size: 4rem !important;
      padding: 2% 0;

      @media screen and (max-width: 600px) {
        font-size: 2rem !important;
        padding: 3% 0;
      }
      @media screen and (min-width: 600px) and (max-width: 1264px) {
        font-size: 3rem !important;
        padding: 3% 0;
      }
    }
  }

  &__title:hover {
    cursor: pointer;
  }

  &__auth_cards {
    height: 60%;

    @media screen and (max-width: 600px) {
      margin: 55% 2%;
      height: 37%;
    }

    padding: 0 2%;

    &__container {
      height: 100%;
      padding: 0 1%;
      position: relative;

      @media screen and (max-width: 600px) {
        padding: 2% 2%;
      }
    }

    &__card {
      height: 100%;
      border-top-left-radius: 30% 20% !important;
      border-bottom-right-radius: 30% 20% !important;
      text-align: center;

      &--teal {
        background: linear-gradient(0deg, #80cbc4 0%, #26a69a 100%);
      }

      &--teal:hover {
        background: linear-gradient(0deg, #80cbc4 0%, #00897b 100%);
      }

      &--indigo {
        background: linear-gradient(0deg, #c5cae9 0%, #7986cb 100%);
      }

      &--indigo:hover {
        background: linear-gradient(0deg, #c5cae9 0%, #5c6bc0 100%);
      }

      &--deep-orange {
        background: linear-gradient(0deg, #ffab91 0%, #ff7043 100%);
      }

      &--deep-orange:hover {
        background: linear-gradient(0deg, #ffab91 0%, #f4511e 100%);
      }

      &--yellow {
        background: linear-gradient(0deg, #fff59d 0%, #ffee58 100%);
      }

      &--yellow:hover {
        background: linear-gradient(0deg, #fff59d 0%, #fdd835 100%);
      }

      &--amber {
        background: linear-gradient(0deg, #ffe082 0%, #ffca28 100%);
      }

      &--amber:hover {
        background: linear-gradient(0deg, #ffe082 0%, #ffb300 100%);
      }

      &__avatar {
        margin-top: 10%;
      }

      &__title {
        padding-top: 10%;
        font-size: 1.5rem !important;
      }

      &__button {
        margin-bottom: 2%;
      }

      &__actions {
        position: absolute;
        top: 90%;
        bottom: 0;
        flex-flow: column wrap;
        align-content: center;
        justify-content: center;
        width: 100%;
      }
    }

    &__card:hover {
      transform: scale(1.05);
      transition-timing-function: ease-in;
      transition: 0.2s;
    }
  }
}
</style>
