<template>
  <div class="ga__signup_drawing_view">
    <v-row class="ga__signup_drawing_view__title_row">
      <v-btn
        outlined
        :color="`deep-orange darken-2`"
        @click="handleBackBtnClick"
      >
        Go Back To Choose IPASS
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#E64A19"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__signup_drawing_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__signup_drawing_view__title__text"
        >
          Sign up
        </div>
      </v-col>
    </v-row>
    <div class="ga__signup_drawing_view__content">
      <div class="ga__signup_drawing_view__form">
        <v-row class="ga__signup_drawing_view__form__container_row">
          <v-col :cols="12" :lg="12">
            <v-form v-model="validSignupForm" :ref="signupFormRef">
              <v-row class="ga__signup_drawing_view__form_row" justify="center">
                <v-col :cols="8" class="ga__signup_drawing_view__form_col">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="20"
                    color="deep-orange"
                    label="first and last name"
                    required
                    filled
                    dark
                    class="ga__signup_drawing_view__form_field"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="ga__signup_drawing_view__form_row" justify="center">
                <v-col :cols="8" class="ga__signup_drawing_view__form_col">
                  <v-text-field
                    v-model="userName"
                    :rules="userNameRules"
                    :counter="10"
                    color="deep-orange"
                    label="user name"
                    required
                    filled
                    dark
                    class="ga__signup_drawing_view__form_field"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="ga__signup_drawing_view__form_row" justify="center">
                <v-col :cols="8" class="ga__signup_drawing_view__form_col">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    color="deep-orange"
                    label="email"
                    required
                    filled
                    dark
                    class="ga__signup_drawing_view__form_field"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row :class="[{ hidden: logoVisible }]">
                <v-col
                  :cols="12"
                  class="ga__signup_drawing_view__drawings_title"
                >
                  <div class="grey--text text--darken-1" v-if="!passIsComplete">
                    Draw your
                    <span
                      class="text-overline font-weight-light white--text ga__signup_drawing_view__drawings_title__pass"
                      >IPASS</span
                    >
                  </div>
                  <div class="grey--text text--darken-1" v-if="passIsComplete">
                    Your
                    <span
                      class="text-overline font-weight-light white--text ga__signup_drawing_view__drawings_title__pass"
                      >IPASS</span
                    >
                    is complete!
                  </div>
                </v-col>
              </v-row>
              <v-row
                :class="[
                  'ga__signup_drawing_view__drawings_row',
                  { hidden: logoVisible },
                ]"
              >
                <v-col
                  :cols="3"
                  v-for="(drawingPass, index) in drawingPasses"
                  :key="index"
                  class="ga__signup_drawing_view__drawing"
                >
                  <div
                    class="ga__signup_drawing_view__drawing__content dotted_background"
                  >
                    <div
                      v-if="drawingPassesToBeHidden[index]"
                      class="pass_item__hidden"
                    ></div>
                    <v-img
                      v-else
                      :src="drawingPass"
                      height="100px"
                      width="100px"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row
                v-if="passIsComplete"
                class="ga__signup_drawing_view__show_pass_row"
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
            </v-form></v-col
          >
        </v-row>
      </div>
      <div class="ga__signup_drawing_view__drawing_canvas">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__signup_drawing_view__controls"
        >
          <div
            v-if="onLargerViewPort"
            class="text-overline font-weight-light white--text break"
          >
            What next ?
          </div>
          <v-btn
            outlined
            :color="`deep-orange darken-2`"
            ref="signupFormBtn"
            @click="handleSignupBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Sign Up
          </v-btn>
          <div class="ga__signup_drawing_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`deep-orange darken-2`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <drawing-canvas v-else @drawing-saved="handleDrawingSave" />
      </div>
    </div>
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
    <v-overlay :value="signupInProgressOverlay" :opacity="0.95">
      <div class="ga__signup_drawing_view__overlay__animated">
        <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
      </div>
      <v-progress-circular
        indeterminate
        size="64"
        v-if="signupInProgress"
      ></v-progress-circular>
      <div class="ga__signup_drawing_view__overlay__content" v-else>
        <div v-if="signupSucceeded">
          <div>YOU'VE BEEN SIGNED UP!</div>
          <div
            class="ga__signup_drawing_view__pass_strength grey--text text--darken-1 mt-6"
            @click="handleCheckPassStrength"
          >
            <fa-icon
              icon="fa-solid fa-shield-halved"
              class="fa-beat-fade mr-2"
              color="#ff5722"
              size="2x"
              pulsate
            />
            <span
              :class="`text-overline font-weight-light deep-orange--text text--darken-2 ga__signup_drawing_view__qualifier`"
            >
              CHECK YOUR PASS STRENGTH
            </span>
          </div>
        </div>
        <div v-if="!drawingPassStrengthInterval && !signupSucceeded">
          <span
            :class="`text-overline font-weight-light deep-orange--text text--darken-2 ga__signup_drawing_view__qualifier`"
          >
            ANALYZING YOUR DRAWINGS
          </span>
          <v-progress-linear
            color="deep-orange accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </div>
        <div v-if="drawingPassStrengthInterval && foundPassStrength">
          <fa-icon
            icon="fa-solid fa-shield-halved"
            class="fa-beat-fade mr-2"
            :color="drawingPassStrengthInterval.color"
            size="2x"
            pulsate
          />
          <span
            :class="`text-overline font-weight-light ${drawingPassStrengthInterval.vColor}--text text--${drawingPassStrengthInterval.vOpacity} ga__signup_drawing_view__qualifier`"
          >
            {{ drawingPassStrengthInterval.qualifying }}
          </span>
          <div class="mt-5">
            <div
              v-for="(sameSimilarityDrawing, index) in sameSimilarityDrawings"
              :key="index"
              :class="`ga__signup_drawing_view__similarity_images--${drawingPassStrengthInterval.vColor} dotted_background mr-2`"
            >
              <v-img
                :src="getActualDrawingDromURL(sameSimilarityDrawing)"
                height="100px"
                width="100"
              />
            </div>
          </div>
        </div>
        <div class="mt-6">
          <v-btn
            outlined
            color="blue-grey darken-3"
            @click="handleCloseAfterSignupOverlay"
            class="mr-2"
          >
            Close
            <fa-icon
              class="ml-2"
              icon="fa-solid fa-circle-xmark"
              color="deep-orange lighten-1"
              size="lg"
            />
          </v-btn>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DrawingCanvas from "@/components/ui/drawing/drawing-canvas.vue";
import {
  DRAWINGS_PASS_COUNT,
  GA_LOGGED_IN_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
} from "@/config/consts";
import {
  INVALID_USERNAME_MSG,
  SIGNUP_FAILED_MSG,
} from "@/config/error-messages";
import { mapActions, mapGetters } from "vuex";
import { transformDrawingPassSignup } from "@/utils/drawing-pass-transform";
import { sameSimilarityDrawings } from "@/store/modules/drawings_similarity/getters";
// @ts-ignore
import { ParticlesBg } from "particles-bg-vue";

export default Vue.extend({
  components: { DrawingCanvas, ParticlesBg },
  name: "GASignupDrawingView",

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
      drawingPassCount: DRAWINGS_PASS_COUNT,
      drawingPasses: [] as any[],
      drawingPassLastCompletedIndex: 0,
      drawingPassesToBeHidden: [] as any,
      passAfterTransformation: "",
      signupInProgress: false,
      drawingPassStrengthInterval: null as any,
      checkingPassStrength: false,
      foundPassStrength: false,
      loadingDeepAIAnswer: false,
      signupSucceeded: false,
      signupErrorShows: false,
      signupErrorMsg: "Invalid username!",
      signupInProgressOverlay: false,
    };
  },

  async created() {
    this.setUpDefaultDrawingsPass();
  },

  methods: {
    ...mapActions("authentication", ["fetchSignup"]),
    ...mapActions("drawings", [
      "fetchUploadDrawing",
      "fetchUploadUserUploadedDrawings",
      "fetchResetUserUploadedDrawings",
    ]),
    ...mapActions("drawingsSimilarity", ["fetchUploadedDrawingsSimilarity"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_SIGNUP_ROUTE_NAME });
    },

    setUpDefaultDrawingsPass() {
      for (let index = 0; index < this.drawingPassCount; index++) {
        this.drawingPasses.push("");
      }
    },

    handleSeePass() {
      for (const drawingPassToBeHidden in this.drawingPassesToBeHidden) {
        this.drawingPassesToBeHidden[drawingPassToBeHidden] =
          !this.drawingPassesToBeHidden[drawingPassToBeHidden];
      }
      if (!this.drawingPassesToBeHidden[0]) {
        setTimeout(() => {
          for (const drawingPassToBeHidden in this.drawingPassesToBeHidden) {
            this.drawingPassesToBeHidden[drawingPassToBeHidden] =
              !this.drawingPassesToBeHidden[drawingPassToBeHidden];
          }
        }, 400);
      }
    },

    hidePassItem() {
      setTimeout(() => {
        this.drawingPassesToBeHidden = {
          ...this.drawingPassesToBeHidden,
          [this.drawingPassLastCompletedIndex - 1]: true,
        };
      }, 300);
    },

    handleDrawingSave(isEmpty: boolean, drawingItem: any) {
      if (!isEmpty) {
        if (this.logoVisible) {
          this.logoVisible = false;
        }
        if (this.drawingPassLastCompletedIndex < this.drawingPassCount - 1) {
          this.drawingPasses = {
            ...this.drawingPasses,
            [this.drawingPassLastCompletedIndex]: drawingItem,
          };
          this.drawingPassLastCompletedIndex++;
        } else {
          this.drawingPasses = {
            ...this.drawingPasses,
            [this.drawingPassLastCompletedIndex]: drawingItem,
          };
          this.drawingPassLastCompletedIndex++;
        }
      } else {
        // nothing has been drawn yet
        this.signupErrorShows = true;
        this.signupErrorMsg = "You haven't drawn anything yet!";
      }
      this.hidePassItem();
    },

    handleClearBtnClick() {
      this.name = "";
      this.userName = "";
      this.email = "";
      this.drawingPasses = [] as any;
      this.drawingPassLastCompletedIndex = 0;
      this.drawingPassesToBeHidden = [] as any;
      this.setUpDefaultDrawingsPass();
    },

    async submitSignup() {
      // step 1. upload the users' drawings
      const drawingsArray = Object.entries(this.drawingPasses);
      for (const drawing of drawingsArray) {
        await this.fetchUploadDrawing({ drawing: drawing[1] });
      }

      // step 2. transform drawing pass
      this.passAfterTransformation = transformDrawingPassSignup(
        this.uploadedDrawings
      );

      // step 3. signup user
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
          this.signupInProgress = false;
          this.signupSucceeded = true;

          // step 4. upload the drawings filenames to user_uploaded_drawings
          //         for the newly signed up user
          await this.fetchUploadUserUploadedDrawings({
            userName: this.userName,
            uploadedDrawings: this.uploadedDrawings,
          });
        }
      } catch (err) {
        this.signupErrorShows = true;
        this.signupErrorMsg = SIGNUP_FAILED_MSG;
        this.signupInProgressOverlay = false;
        this.fetchResetUserUploadedDrawings();
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
        this.signupInProgress = true;
        this.signupInProgressOverlay = true;
        this.submitSignup();
      }
    },

    async handleCheckPassStrength() {
      this.signupSucceeded = false;
      this.checkingPassStrength = true;
      await this.fetchUploadedDrawingsSimilarity(this.uploadedDrawings);
      this.drawingPassStrengthInterval = this.similarityLevel;
      this.foundPassStrength = true;
      this.fetchResetUserUploadedDrawings();
    },

    async handleCloseAfterSignupOverlay() {
      this.signupInProgressOverlay = false;
      this.$router.push({ name: GA_LOGGED_IN_ROUTE_NAME });
    },

    getActualDrawingDromURL(drawingURL: string) {
      return `/ga/api/drawings/drawing_actual/${drawingURL}`;
    },
  },

  computed: {
    ...mapGetters("drawings", ["uploadedDrawings"]),
    ...mapGetters("drawingsSimilarity", [
      "similarityLevel",
      "sameSimilarityDrawings",
    ]),

    onLargerViewPort(): boolean {
      return (
        // @ts-ignore
        this.$vuetify.breakpoint.name === "lg" ||
        // @ts-ignore
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    passIsComplete(): boolean {
      return this.drawingPassLastCompletedIndex === this.drawingPassCount;
    },
  },
});
</script>

<style lang="scss" scoped>
// for dotted background
// dimensions
$bg-color: white;
$dot-color: black;
$dot-size: 1px;
$dot-space: 22px;

.ga__signup_drawing_view {
  height: 100%;
  margin-top: -10px;
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
    }

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }

  &__drawings {
    &__row {
      height: 400px;
      overflow-y: auto;
    }
  }

  &__drawing_wrapper {
    background: #ff5722;
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

  &__drawing_wrapper:hover {
    background: #ff5722;
    cursor: pointer;
  }

  &__controls {
    height: 100%;
    width: 50%;
    margin: auto;
    align-items: center;

    @media screen and (min-width: 1264px) {
      background: linear-gradient(0deg, #ffab91 0%, #ff7043 100%);
      border-top-left-radius: 30% 20% !important;
      border-bottom-right-radius: 30% 20% !important;
    }

    &__separator {
      @media screen and (max-width: 600px) {
        display: none;
      }
    }
  }

  &__drawing_canvas {
    width: 48%;
    padding-top: 12px;
    display: inline-block;
  }

  &__overlay__content {
    text-align: center;
    z-index: 20;
    left: 0px;
    top: 0px;
    height: 100%;
    position: relative;
  }

  &__overlay__animated {
    z-index: 1;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  &__similarity_images {
    &--red {
      display: inline-block;
      border: solid 2px #c62828;
    }

    &--amber {
      display: inline-block;
      border: solid 2px #ff8f00;
    }

    &--green {
      display: inline-block;
      border: solid 2px #2e7d32;
    }
  }

  &__pass_strength:hover {
    cursor: pointer;
  }

  &__qualifier {
    vertical-align: text-bottom;
  }

  &__show_pass_row {
    display: flex;
    justify-content: center;
  }
}

.dotted_background {
  background: linear-gradient(
        90deg,
        $bg-color ($dot-space - $dot-size),
        transparent 1%
      )
      center,
    linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
    $dot-color;
  background-size: $dot-space $dot-space;
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
