<template>
  <div class="ga__login_pass_points_view">
    <v-row class="ga__login_pass_points_view__title_row">
      <v-btn outlined :color="`amber darken-2`" @click="handleBackBtnClick">
        Go Back To Choose IPASS
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#FFA000"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__login_pass_points_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__login_pass_points_view__title__text"
        >
          Login
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__login_pass_points_view__content">
      <v-col :cols="12" :lg="6">
        <v-form v-model="validLoginForm" :ref="loginFormRef">
          <v-row
            class="ga__login_pass_points_view__form_row mt-6 mb-6"
            justify="center"
          >
            <v-col :cols="8" class="ga__login_pass_points_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :disabled="foundUserPassPoints"
                :counter="10"
                color="amber darken-2"
                label="user name"
                required
                filled
                dark
                class="ga__login_pass_points_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="!hasAnsweredBringPassPoints">
            <div
              class="grey--text text--darken-1 mb-2 ga__login_pass_points_view__own_drawings"
            >
              <fa-icon
                icon="fa-solid fa-id-badge"
                class="fa-beat-fade mr-2"
                size="2x"
              />
              <span
                class="text-overline font-weight-light amber--text text--darken-2 ga__login_pass_points_view__qualifier"
              >
                Are you ready to find your PASS points
              </span>
              <v-btn
                class="white--text mr-4 ml-2"
                outlined
                x-small
                :color="`red lighten-2`"
                @click="handleDoNotBringPassPointsYet"
              >
                no
              </v-btn>
              <v-btn
                class="white--text"
                outlined
                x-small
                :color="`green lighten-2`"
                @click="handleBringPassPoints"
              >
                yes
              </v-btn>
            </div>
          </v-row>
          <v-row :class="[{ hidden: !hasAnsweredBringPassPoints }]">
            <v-col
              :cols="12"
              class="ga__login_pass_points_view__drawings_title"
            >
              <div
                class="grey--text text--darken-1"
                v-if="!passIsComplete && passPointsLastCompletedIndex === 0"
              >
                Choose pass-points for your
                <span
                  class="text-overline font-weight-light white--text ga__signup_pass_points_view__drawings_title__pass"
                  >IPASS</span
                >
              </div>
              <div
                class="grey--text text--darken-1"
                v-if="!passIsComplete && passPointsLastCompletedIndex !== 0"
              >
                Continue adding your pass-points
                <span
                  class="text-overline font-weight-light white--text ga__signup_pass_points_view__drawings_title__pass"
                  >IPASS</span
                >
              </div>
              <div class="grey--text text--darken-1" v-if="passIsComplete">
                Your
                <span
                  class="text-overline font-weight-light white--text ga__signup_pass_points_view__drawings_title__pass"
                  >IPASS</span
                >
                is complete!
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col :cols="12" :lg="6" v-if="foundUserPassPoints">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__login_pass_points_view__controls"
        >
          <div v-if="onLargerViewPort" class="text-overline white--text break">
            What next ?
          </div>
          <v-btn
            outlined
            :color="`amber darken-4`"
            ref="loginFormBtn"
            @click="handleLoginBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Login
          </v-btn>
          <div class="ga__login_pass_points_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`amber darken-2`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <div v-else>
          <div class="ga__login_pass_points_view__border_gradient pulse">
            <v-img
              @click="drawPassPoint"
              maxHeight="500"
              :src="`http://localhost:8080/ga/api/pass_point/image_actual/${userUploadedImage}`"
              id="uploaded_image"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <div
      :class="[
        'ga__login_pass_points_view__logo_container',
        { hidden: !logoIsVisible },
      ]"
    >
      <div class="ga__login_pass_points_view__logo"></div>
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
import {
  GA_LOGGED_IN_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  PASS_POINTS_PASS_COUNT,
} from "@/config/consts";
import { mapActions, mapGetters } from "vuex";
import {
  INVALID_USERNAME_MSG,
  LOGIN_FAILED_MSG,
  USERNAME_FIRST_COMPLETED,
} from "@/config/error-messages";
import { transformPassPoints } from "@/utils/pass-points-transform";
import { testPassPointsDistance } from "@/utils/pass-strength-test";

export default Vue.extend({
  components: {},
  name: "GALoginDrawingView",

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
      logoVisible: true,
      passPointsCount: PASS_POINTS_PASS_COUNT,
      passPointsPairs: [] as any,
      passPointsLastCompletedIndex: 0,
      passAfterTransformation: "",
      foundUserPassPoints: false,
      hasAnsweredBringPassPoints: false,
      loginErrorShows: false,
      loginErrorMsg: "Invalid username!",
      loginInProgressOverlay: false,
    };
  },

  methods: {
    ...mapActions("authentication", ["fetchLogin"]),
    ...mapActions("passPoints", ["fetchUserUploadedPassPointImage"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_LOGIN_ROUTE_NAME });
    },
    handleDoNotBringPassPointsYet() {
      console.log("not ready");
    },
    async handleBringPassPoints() {
      if (!this.userName) {
        this.loginErrorShows = true;
        this.loginErrorMsg = USERNAME_FIRST_COMPLETED;
        return;
      }

      this.hasAnsweredBringPassPoints = !this.hasAnsweredBringPassPoints;
      this.foundUserPassPoints = !this.foundUserPassPoints;
      await this.fetchUserUploadedPassPointImage(this.userName);
    },
    handleClearBtnClick() {
      this.passPointsPairs = [] as any;
      this.passPointsLastCompletedIndex = 0;
    },
    async drawPassPoint() {
      // get the absolute position of the newly add pass point
      // @ts-ignore
      const mousePositionX = event.pageX;
      // @ts-ignore
      const mousePositionY = event.pageY;

      // create the new HTML element and set the styles
      const newPassPoint = document.createElement("div");
      newPassPoint.style.position = "absolute";
      newPassPoint.style.top = mousePositionY + "px";
      newPassPoint.style.left = mousePositionX + "px";
      newPassPoint.style.width = "20px";
      newPassPoint.style.height = "20px";
      newPassPoint.style.background =
        "conic-gradient( #4db6ac 0%, #9fa8da 25%, #ff7043 50%, #fff176 80%, #4db6ac 100%)";
      newPassPoint.style.transform = "scale(1)";
      newPassPoint.style.animation = "pulse 2s infinite";
      newPassPoint.style.borderRadius = "50%";
      newPassPoint.animate(
        [{ scale: "0.5" }, { scale: "1.5" }, { scale: "0.5" }],
        {
          duration: 1000,
          iterations: Infinity,
        }
      );
      document.body.appendChild(newPassPoint);

      // remove the visual new added point ( security reasons )
      setTimeout(() => {
        newPassPoint.style.display = "none";
      }, 800);

      // relative to parent uploaded image
      const uploadedImage = document.getElementById("uploaded_image");
      const topFromParent = Math.abs(
        (uploadedImage?.offsetTop ?? 0) - mousePositionY
      );
      const leftFromParent = Math.abs(
        (uploadedImage?.offsetLeft ?? 0) - mousePositionX
      );

      const parentHeight = uploadedImage?.clientHeight;
      const parentWidth = uploadedImage?.clientWidth;

      const percentageDistanceFromTop =
        (topFromParent / (parentHeight ?? 1)) * 100;
      const percentageDistanceFromLeft =
        (leftFromParent / (parentWidth ?? 1)) * 100;

      this.addPassPoint(percentageDistanceFromLeft, percentageDistanceFromTop);
    },
    addPassPoint(leftPercentage: number, topPercentage: number) {
      if (this.passPointsLastCompletedIndex < this.passPointsCount - 1) {
        this.passPointsPairs = {
          ...this.passPointsPairs,
          [this.passPointsLastCompletedIndex]: [leftPercentage, topPercentage],
        };
        this.passPointsLastCompletedIndex++;
      } else {
        this.passPointsPairs = {
          ...this.passPointsPairs,
          [this.passPointsLastCompletedIndex]: [leftPercentage, topPercentage],
        };
        setTimeout(() => {
          this.passPointsLastCompletedIndex++;
          if (this.logoVisible) {
            this.logoVisible = false;
          }
        }, 1500);

        this.passAfterTransformation = transformPassPoints(
          Object.values(this.userUploadedPassPoints[0]),
          this.userUploadedImage
        );
      }
    },
    async submitLogin() {
      const isPassValid = testPassPointsDistance(
        Object.values(this.passPointsPairs),
        Object.values(this.userUploadedPassPoints[0])
      );

      if (!isPassValid) {
        this.loginErrorShows = true;
        this.loginErrorMsg = LOGIN_FAILED_MSG;
        this.loginInProgressOverlay = false;
        return;
      }

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
    handleLoginBtnClick() {
      // @ts-ignore
      const isFormValid = this.$refs.loginFormRef.validate();
      if (!isFormValid) {
        this.loginErrorShows = true;
        this.loginErrorMsg = INVALID_USERNAME_MSG;
        // @ts-ignore
        this.$refs.loginFormRef.reset();
      } else {
        this.loginInProgressOverlay = true;
        this.submitLogin();
      }
    },
  },

  computed: {
    ...mapGetters("passPoints", [
      "userUploadedPassPoints",
      "userUploadedImage",
    ]),

    onLargerViewPort(): boolean {
      return (
        this.$vuetify.breakpoint.name === "lg" ||
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    logoIsVisible(): boolean {
      return this.logoVisible && this.onLargerViewPort;
    },
    passIsComplete(): boolean {
      return this.passPointsLastCompletedIndex === this.passPointsCount;
    },
    getSelectableDrawingsSize(): string {
      return this.onLargerViewPort ? "150" : "58";
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__login_pass_points_view {
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
    width: 48%;
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

  &__drawings_title {
    text-align: center;

    &__pass {
      font-size: 1.5rem !important;
      margin-left: 1%;
    }
  }

  &__drawings_row {
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 0;
  }

  &__drawing {
    &__content {
      border: #ff5722 1px solid;
      height: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 768px) {
        height: 5rem;
      }
    }

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }

  &__border_gradient {
    background-color: whitesmoke;

    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(
      to left,
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 100%
    );
  }

  &__controls {
    height: 200%;
    width: 50%;
    margin: auto;
    align-items: center;

    @media screen and (min-width: 1264px) {
      background: linear-gradient(0deg, #ffe082 0%, #ffa000 100%);
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

  &__own_drawings {
    display: flex;
    align-items: center;
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

.pulse {
  box-shadow: 0 0 0 rgba(255, 193, 7, 0.4);
  animation: pulse 1.7s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.5);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 30px rgba(255, 193, 7, 0);
    box-shadow: 0 0 0 30px rgba(255, 193, 7, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
  }
}
</style>
