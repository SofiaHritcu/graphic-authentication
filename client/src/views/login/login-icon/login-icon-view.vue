<template>
  <div class="ga__login_icon_view">
    <v-row class="ga__login_icon_view__title_row">
      <v-btn outlined :color="`teal darken-2`" @click="handleBackBtnClick">
        Go Back To Choose IPASS
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#00796B"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__login_icon_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__login_icon_view__title__text"
        >
          Login
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__login_icon_view__content">
      <v-col :cols="12" :lg="6">
        <v-form v-model="validLoginForm" :ref="loginFormRef">
          <v-row class="ga__login_icon_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_icon_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :counter="10"
                color="teal"
                label="user name"
                required
                filled
                dark
                class="ga__login_icon_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ga__login_icon_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_icon_view__form_col">
              <v-select
                :items="iconCategoriesItems"
                :value="iconCategoriesItems[0]"
                label="icon category"
                color="teal"
                item-color="teal"
                hint="Select the icons category in order to build up your pass"
                persistent-hint
                required
                filled
                dark
                @change="handleIconCategoryChange"
              ></v-select>
            </v-col>
          </v-row>
          <v-row :class="[{ hidden: logoVisible }]">
            <v-col :cols="12" class="ga__login_icon_view__icons_title">
              <div class="grey--text text--darken-1" v-if="!passIsComplete">
                Choose icons for your
                <span
                  class="text-overline font-weight-light white--text ga__login_icon_view__icons_title__pass"
                  >IPASS</span
                >
              </div>
              <div class="grey--text text--darken-1" v-if="passIsComplete">
                Your
                <span
                  class="text-overline font-weight-light white--text ga__login_icon_view__icons_title__pass"
                  >IPASS</span
                >
                is complete!
              </div>
              <div class="grey--text text--darken-1 mt-4" v-if="passIsComplete">
                <fa-icon
                  icon="fa-solid fa-shield-halved"
                  class="fa-beat-fade mr-4"
                  :color="iconPassStrengthInterval.color"
                  size="3x"
                  pulsate
                />
                <span
                  :class="`text-overline font-weight-light ${iconPassStrengthInterval.vColor}--text text--${iconPassStrengthInterval.vOpacity} ga__login_icon_view__qualifier`"
                >
                  {{ iconPassStrengthInterval.qualifying }}
                </span>
              </div>
            </v-col>
          </v-row>
          <v-row
            :class="['ga__login_icon_view__icons_row', { hidden: logoVisible }]"
          >
            <v-col
              :cols="2"
              v-for="(iconPass, index) in iconPasses"
              :key="index"
              class="ga__login_icon_view__icon"
            >
              <div class="ga__login_icon_view__icon__content">
                <div
                  v-if="iconPassesToBeHidden[index]"
                  class="pass_item__hidden"
                ></div>
                <fa-icon
                  v-if="!iconPassesToBeHidden[index] && iconPass"
                  :icon="`fa-solid fa-${iconPass}`"
                  color="white"
                  size="2x"
                />
              </div>
            </v-col>
          </v-row>
          <v-row
            v-if="passIsComplete"
            class="ga__login_icon_view__show_pass_row"
          >
            <v-btn
              outlined
              small
              :color="`grey darken-2`"
              @click="handleSeePass"
              class="mr-3"
            >
              <fa-icon
                icon="fa-solid fa-eye"
                class="mr-2"
                color="grey darken-2"
              />
              Show PASS
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
      <v-col :cols="12" :lg="6" class="ga__login_icon_view__icons">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__login_icon_view__controls"
        >
          <div
            v-if="onLargerViewPort"
            class="text-overline font-weight-light white--text break"
          >
            What next ?
          </div>
          <v-btn
            outlined
            :color="`teal darken-2`"
            ref="loginFormBtn"
            @click="handleLoginBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Login
          </v-btn>
          <div class="ga__login_icon_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`teal darken-2`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <v-row class="ga__login_icon_view__icons__row" v-else>
          <v-col
            :cols="3"
            v-for="(iconItem, index) in iconItems"
            :key="index"
            align-self="center"
          >
            <div
              class="ga__login_icon_view__icon_wrapper"
              @click="handleIconClick(iconItem)"
            >
              <fa-icon
                :icon="`fa-solid fa-${iconItem}`"
                color="white"
                :size="getSelectableIconsSize"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      :class="[
        'ga__login_icon_view__logo_container',
        { hidden: !logoIsVisible },
      ]"
    >
      <div class="ga__login_icon_view__logo"></div>
    </div>
    <v-snackbar v-model="loginErrorShows">
      {{ loginErrorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red darken-3"
          text
          :timeout="5000"
          v-bind="attrs"
          @click="loginErrorShows = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="loginInProgressOverlay" :opacity="0.95">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import {
  GA_LOGIN_ROUTE_NAME,
  ICONS_PASS_COUNT,
  GA_LOGGED_IN_ROUTE_NAME,
} from "@/config/consts";
import {
  INVALID_USERNAME_MSG,
  LOGIN_FAILED_MSG,
} from "@/config/error-messages";
import { transformIconPass } from "@/utils/icon-pass-transform";
import { getIconPassStrengthInterval } from "@/utils/pass-strength-color";

export default Vue.extend({
  name: "GALoginIconView",
  data() {
    return {
      validLoginForm: false,
      loginFormRef: "loginFormRef",
      userName: "",
      userNameRules: [
        (v: string) => !!v || "username is required",
        (v: string) =>
          v.length <= 10 || "username must be less than 10 characters",
      ],
      iconCategoriesItems: [],
      logoVisible: true,
      iconPassCount: ICONS_PASS_COUNT,
      iconPasses: [] as any,
      iconItems: [],
      iconPassesToBeHidden: [] as any,
      iconPassLastCompletedIndex: 0,
      passAfterTransformation: "",
      iconPassStrengthInterval: null as any,
      loginErrorShows: false,
      loginErrorMsg: "Invalid username!",
      loginInProgressOverlay: false,
    };
  },
  async created() {
    this.setUpDefaultIconsPass();
    await this.setUpIconsCategories();
  },
  methods: {
    ...mapActions("icons", ["fetchIconsCategories"]),
    ...mapActions("authentication", ["fetchLogin"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_LOGIN_ROUTE_NAME });
    },
    async setUpIconsCategories() {
      this.fetchIconsCategories().then((res) => {
        if (res) {
          this.iconCategoriesItems = this.iconsCategories.map(
            (ic: GA.IconCategoryBase) => ic.category
          );
          this.iconItems = this.iconsCategories[0].icons;
        }
      });
    },
    setUpDefaultIconsPass() {
      for (let index = 0; index < this.iconPassCount; index++) {
        this.iconPasses.push("");
        this.iconPassesToBeHidden.push(false);
      }
    },
    handleIconCategoryChange(iconCategorySelected: string) {
      if (this.logoVisible) {
        this.logoVisible = false;
      }

      const iconsSelectedCategory = this.iconsCategories.find(
        (ic: GA.IconCategoryBase) => ic.category === iconCategorySelected
      ).icons;
      this.iconItems = iconsSelectedCategory;
    },
    handleSeePass() {
      for (const iconPassToBeHidden in this.iconPassesToBeHidden) {
        this.iconPassesToBeHidden[iconPassToBeHidden] =
          !this.iconPassesToBeHidden[iconPassToBeHidden];
      }
      if (!this.iconPassesToBeHidden[0]) {
        setTimeout(() => {
          for (const iconPassToBeHidden in this.iconPassesToBeHidden) {
            this.iconPassesToBeHidden[iconPassToBeHidden] =
              !this.iconPassesToBeHidden[iconPassToBeHidden];
          }
        }, 400);
      }
    },
    hidePassItem() {
      setTimeout(() => {
        this.iconPassesToBeHidden = {
          ...this.iconPassesToBeHidden,
          [this.iconPassLastCompletedIndex - 1]: true,
        };
      }, 200);
    },
    handleIconClick(iconItem: string) {
      if (this.logoVisible) {
        this.logoVisible = false;
      }
      if (this.iconPassLastCompletedIndex < this.iconPassCount - 1) {
        this.iconPasses = {
          ...this.iconPasses,
          [this.iconPassLastCompletedIndex]: iconItem,
        };
        this.iconPassLastCompletedIndex++;
      } else {
        this.iconPasses = {
          ...this.iconPasses,
          [this.iconPassLastCompletedIndex]: iconItem,
        };
        this.iconPassLastCompletedIndex++;
        this.passAfterTransformation = transformIconPass(
          Object.assign([], this.iconPasses)
        );
        this.iconPassStrengthInterval = getIconPassStrengthInterval(
          this.passAfterTransformation
        );
      }
      this.hidePassItem();
    },
    handleClearBtnClick() {
      this.userName = "";
      (this.iconPasses = [] as any), (this.iconPassLastCompletedIndex = 0);
      this.iconPassesToBeHidden = [] as any;
      this.setUpDefaultIconsPass();
    },
    async submitLogin() {
      const userToBeLoggedIn = {
        userName: this.userName,
        password: this.passAfterTransformation,
      };
      try {
        let authSuccess = await this.fetchLogin(userToBeLoggedIn);
        if (authSuccess) {
          this.$router.push({ name: GA_LOGGED_IN_ROUTE_NAME });
          this.loginInProgressOverlay = false;
        }
      } catch (err) {
        this.loginErrorShows = true;
        this.loginErrorMsg = LOGIN_FAILED_MSG;
        this.loginInProgressOverlay = false;
      }
    },
    async handleLoginBtnClick() {
      // @ts-ignore
      const isFormValid = this.$refs.loginFormRef.validate();
      if (!isFormValid) {
        this.loginErrorShows = true;
        this.loginErrorMsg = INVALID_USERNAME_MSG;
        // @ts-ignore
        this.$refs.loginFormRef.reset();
      } else {
        this.loginInProgressOverlay = true;
        await this.submitLogin();
      }
    },
  },
  computed: {
    ...mapGetters("icons", ["iconsCategories"]),
    onLargerViewPort(): boolean {
      return (
        // @ts-ignore
        this.$vuetify.breakpoint.name === "lg" ||
        // @ts-ignore
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    iconsScrollSize(): number {
      return this.onLargerViewPort ? 400 : 200;
    },
    logoIsVisible(): boolean {
      return this.logoVisible && this.onLargerViewPort;
    },
    passIsComplete(): boolean {
      return this.iconPassLastCompletedIndex === this.iconPassCount;
    },
    getSelectableIconsSize(): string {
      return this.onLargerViewPort ? "2x" : "lg";
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__login_icon_view {
  height: 100%;
  &__title_row {
    margin: 0;
  }

  &__title {
    text-align: center;
    margin: 0;
    &__text {
      font-size: 3rem !important;
      padding: 2% 0;

      @media screen and (max-width: 600px) {
        font-size: 2rem !important;
        padding: 3% 0;
      }
      @media screen and (min-width: 600px) and (max-width: 1264px) {
        font-size: 2rem !important;
        padding: 3% 0;
      }
    }
  }

  &__content {
    margin: 0;
  }

  &__form_col {
    width: 50%;
  }

  &__form_row {
    margin: 0;
    text-align: center;
  }

  &__logo_container {
    height: 35%;
    width: 50%;
    margin: 0;
    position: absolute;
    bottom: 0;
    text-align: center;
    background: #263238;

    @media screen and (max-width: 768px) {
      height: 20%;
      width: 100%;
      position: relative;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 30%;
      width: 40%;
    }
  }

  &__logo {
    height: 100%;
    width: 50%;
    margin-left: 25%;
    background: conic-gradient(
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 80%,
      #4db6ac 100%
    );

    border-top-right-radius: 50% 70%;
    border-top-left-radius: 50% 70%;

    @media screen and (max-width: 768px) {
      width: 50%;
      margin-left: 25%;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 80%;
      margin-left: 85%;
    }
  }

  &__icons_title {
    text-align: center;

    &__pass {
      font-size: 1.5rem !important;
      margin-left: 1%;
    }
  }

  &__icons_row {
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 0;
  }

  &__icon {
    &__content {
      border: #009688 1px solid;
      height: 5rem;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }

  &__icons {
    &__row {
      height: 400px;
      overflow-y: auto;
    }
  }

  &__icon_wrapper {
    background: #00796b;
    width: 100px;
    height: 100px;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    @media screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }

  &__icon_wrapper:hover {
    background: #009688;
    cursor: pointer;
  }

  &__controls {
    height: 100%;
    width: 50%;
    margin: auto;
    align-items: center;

    @media screen and (min-width: 1264px) {
      background: linear-gradient(0deg, #80cbc4 0%, #26a69a 100%);
      border-top-left-radius: 30% 20% !important;
      border-bottom-right-radius: 30% 20% !important;
    }

    &__separator {
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
  }

  &__qualifier {
    vertical-align: text-bottom;
  }

  &__show_pass_row {
    display: flex;
    justify-content: center;
  }
}

.hidden {
  display: none;
}

.break {
  flex-basis: 100%;
  height: 0;
  text-align: center;
}

.pass_item__hidden {
  background: conic-gradient(
    #4db6ac 0%,
    #9fa8da 25%,
    #ff7043 50%,
    #fff176 80%,
    #4db6ac 100%
  );
  height: 100%;
  width: 100%;
}
</style>
