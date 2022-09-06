<template>
  <div class="ga__signup_pass_points_view">
    <v-row class="ga__signup_pass_points_view__title_row">
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
      class="ga__signup_pass_points_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__signup_pass_points_view__title__text"
        >
          Sign up
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12" :lg="6">
        <v-form v-model="validSignupForm" :ref="signupFormRef">
          <v-row
            class="ga__signup_pass_points_view__form_row mt-4"
            justify="center"
          >
            <v-col :cols="8" class="ga__signup_pass_points_view__form_col">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="20"
                color="amber darken-2"
                label="first and last name"
                required
                filled
                dark
                class="ga__signup_pass_points_view_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ga__signup_pass_points_view__form_row" justify="center">
            <v-col :cols="8" class="ga__signup_pass_points_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :counter="10"
                color="amber darken-2"
                label="user name"
                required
                filled
                dark
                class="ga__signup_pass_points_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ga__signup_pass_points_view__form_row" justify="center">
            <v-col :cols="8" class="ga__signup_pass_points_view__form_col">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                color="amber darken-2"
                label="email"
                required
                filled
                dark
                class="ga__signup_pass_points_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row :class="[{ hidden: !hasUploadedPassPointImage }, 'mb-4']">
            <v-col
              :cols="12"
              class="ga__signup_pass_points_view__drawings_title"
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
              <div class="grey--text text--darken-1 mt-4" v-if="passIsComplete">
                <fa-icon
                  icon="fa-solid fa-shield-halved"
                  class="fa-beat-fade mr-4"
                  :color="passPointsStrengthInterval.color"
                  size="3x"
                  pulsate
                />
                <span
                  :class="`text-overline font-weight-light ${passPointsStrengthInterval.vColor}--text text--${passPointsStrengthInterval.vOpacity} ga__signup_pass_points_view__qualifier`"
                >
                  {{ passPointsStrengthInterval.qualifying }}
                </span>
              </div>
            </v-col>
          </v-row>
          <v-row
            :class="[
              'ga__signup_pass_points_view__logo_row',
              { hidden: logoVisible },
            ]"
          >
            <div
              :class="[
                'ga__signup_pass_points_view__logo_container',
                { hidden: !logoIsVisible },
              ]"
            >
              <div class="ga__signup_pass_points_view__logo"></div>
            </div>
          </v-row>
        </v-form>
      </v-col>
      <v-col :cols="12" :lg="6" class="ga__signup_pass_points_view__right">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__signup_pass_points_view__controls"
        >
          <div v-if="onLargerViewPort" class="text-overline white--text break">
            What next ?
          </div>
          <v-btn
            outlined
            :color="`amber darken-4`"
            ref="signupFormBtn"
            @click="handleSignupBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Sign up
          </v-btn>
          <div class="ga__signup_pass_points_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`amber darken-4`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <div v-else>
          <div
            v-if="!hasUploadedPassPointImage"
            class="ga__signup_pass_points_view__image_wrapper"
          >
            <pass-points />
          </div>
          <div
            v-else
            class="ga__signup_pass_points_view__border_gradient pulse"
          >
            <v-img
              maxHeight="500"
              @click="drawPassPoint"
              :src="`https://sleepy-hollows-64004.herokuapp.com/ga/api/pass_point/image_actual/${uploadedImage}`"
              id="uploaded_image"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="signupErrorShows">
      {{ signupErrorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red darken-3"
          text
          :timeout="5000"
          v-bind="attrs"
          @click="signupErrorShows = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {
  GA_LOGGED_IN_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
  PASS_POINTS_PASS_COUNT,
} from "@/config/consts";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import PassPoints from "@/components/ui/pass-points/pass-points.vue";
import { uploadedImage } from "@/store/modules/pass_points/getters";
import { urlToFile } from "@/utils/file-utils";
import {
  INVALID_USERNAME_MSG,
  SIGNUP_FAILED_MSG,
} from "@/config/error-messages";
import { getPassPointsStrengthInterval } from "@/utils/pass-strength-color";
import { transformPassPoints } from "@/utils/pass-points-transform";

export default Vue.extend({
  components: { PassPoints },
  name: "GASignupPassPointsView",

  data() {
    return {
      validSignupForm: false,
      signupFormRef: "signupFormRef",
      name: "",
      userName: "",
      email: "",
      nameRules: [
        (v: string) => !!v || "name is required",
        (v: string) =>
          v.length <= 20 || "the name must be less than 20 characters",
      ],
      userNameRules: [
        (v: string) => !!v || "username is required",
        (v: string) =>
          v.length <= 10 || "username must be less than 10 characters",
      ],
      emailRules: [
        (v: string) => !!v || "e-mail is required",
        (v: string) => /.+@.+/.test(v) || "e-mail must be valid",
      ],
      logoVisible: true,
      passPointsPassCount: PASS_POINTS_PASS_COUNT,
      passPointsPairs: [] as any,
      passPointsLastCompletedIndex: 0,
      passPointsStrengthInterval: null as any,
      passAfterTransformation: "",
      isFirstPassPoint: true,
      signupErrorShows: false,
      signupErrorMsg: "Invalid username!",
      signupInProgressOverlay: false,
    };
  },

  methods: {
    ...mapActions("passPoints", [
      "fetchTextRecogn",
      "fetchActualPassPointImage",
      "fetchUploadUserUploadedPassPointImage",
    ]),
    ...mapActions("authentication", ["fetchSignup"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_SIGNUP_ROUTE_NAME });
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
      if (this.logoVisible) {
        this.logoVisible = false;
      }
      if (this.passPointsLastCompletedIndex < this.passPointsPassCount - 1) {
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
        }, 1500);

        this.passPointsStrengthInterval = getPassPointsStrengthInterval(
          this.passPointsPairs
        );
        this.passAfterTransformation = transformPassPoints(
          Object.assign([], this.passPointsPairs),
          this.uploadedImage
        );
      }
    },

    handleClearBtnClick() {
      this.userName = "";
      this.name = "";
      this.userName = "";
      this.email = "";
      this.passPointsPairs = [] as any;
      this.passPointsLastCompletedIndex = 0;
    },

    async submitSignup() {
      const userToBeLoggedIn = {
        name: this.name,
        userName: this.userName,
        email: this.email,
        password: this.passAfterTransformation,
        confirmPassword: this.passAfterTransformation,
      };
      try {
        let signupSuccess = await this.fetchSignup(userToBeLoggedIn);
        if (signupSuccess) {
          this.fetchUploadUserUploadedPassPointImage({
            userName: this.userName,
            uploadedImage: this.uploadedImage,
            passPoints: this.passPointsPairs,
          });
          await this.$router.push({ name: GA_LOGGED_IN_ROUTE_NAME });
          this.signupInProgressOverlay = false;
        }
      } catch (err) {
        this.signupErrorShows = true;
        this.signupErrorMsg = SIGNUP_FAILED_MSG;
        this.signupInProgressOverlay = false;
      }
    },

    handleSignupBtnClick() {
      // @ts-ignore
      const isFormValid = this.$refs.signupFormRef.validate();
      if (!isFormValid) {
        this.signupErrorShows = true;
        this.signupErrorMsg = INVALID_USERNAME_MSG;
        // @ts-ignore
        this.$refs.signupFormRef.reset();
      } else {
        console.log(this.passPointsPairs);
        this.signupInProgressOverlay = true;
        this.submitSignup();
      }
    },
  },

  computed: {
    ...mapGetters("passPoints", ["uploadedImage"]),

    onLargerViewPort(): boolean {
      return (
        this.$vuetify.breakpoint.name === "lg" ||
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    getUploadedImageSize(): string {
      return this.onLargerViewPort ? "450" : "300";
    },
    hasUploadedPassPointImage(): boolean {
      return this.uploadedImage !== null;
    },
    passIsComplete(): boolean {
      return this.passPointsLastCompletedIndex === this.passPointsPassCount;
    },
    logoIsVisible(): boolean {
      return this.logoVisible && this.onLargerViewPort;
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__signup_pass_points_view {
  height: 100%;

  &__title_row {
    margin: 0;
  }

  &__title {
    text-align: center;
    margin: 0;
    &__text {
      font-size: 3rem !important;
      padding-bottom: 2%;

      @media screen and (max-width: 600px) {
        font-size: 2rem !important;
        padding-bottom: 2%;
      }
      @media screen and (min-width: 600px) and (max-width: 1264px) {
        font-size: 2rem !important;
        padding-bottom: 2%;
      }
    }
  }

  &__content {
    display: flex;
  }

  &__form {
    width: 48%;
    display: inline-block;

    &__container_row {
      margin: 0;
    }
  }

  &__form_col {
    padding: 4px 0;
    width: 50%;
  }

  &__form_row {
    margin: 0;
    text-align: center;
  }

  &__logo_container {
    height: 20%;
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
      at 50% 80%,
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 80%,
      #4db6ac 100%
    );

    border-top-right-radius: 50% 95%;
    border-top-left-radius: 50% 95%;

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

  &__right {
    padding-right: 5%;
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

  &__image_wrapper {
    height: 500px;
  }

  &__content {
    display: flex;
  }

  &__controls {
    height: 100%;
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
