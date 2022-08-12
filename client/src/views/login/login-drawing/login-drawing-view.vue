<template>
  <div class="ga__login_drawing_view">
    <v-row class="ga__login_drawing_view__title_row">
      <v-btn
        outlined
        :color="`deep-orange darken-2`"
        @click="handleBackBtnClick"
      >
        Go Back To Choose IPASS
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#FF5722"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__login_drawing_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__login_drawing_view__title__text"
        >
          Login
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__login_drawing_view__content">
      <v-col :cols="12" :lg="6">
        <v-form v-model="validLoginForm" :ref="loginFormRef">
          <v-row class="ga__login_drawing_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_drawing_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :disabled="foundUserDrawings"
                :counter="10"
                color="deep-orange"
                label="user name"
                required
                filled
                dark
                class="ga__login_drawing_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="!hasAnsweredBringDrawings">
            <div
              class="grey--text text--darken-1 mb-2 ga__login_drawing_view__own_drawings"
            >
              <fa-icon
                icon="fa-solid fa-id-badge"
                class="fa-beat-fade mr-2"
                size="2x"
              />
              <span
                class="text-overline font-weight-light deep-orange--text text--darken-5 ga__login_drawing_view__qualifier"
              >
                Are you ready to find your PASS drawings
              </span>
              <v-btn
                class="white--text mr-4 ml-2"
                outlined
                x-small
                :color="`red lighten-2`"
                @click="handleDoNotBringDrawingsYet"
              >
                no
              </v-btn>
              <v-btn
                class="white--text"
                outlined
                x-small
                :color="`green lighten-2`"
                @click="handleBringDrawings"
              >
                yes
              </v-btn>
            </div>
          </v-row>
          <v-row :class="[{ hidden: logoVisible }]">
            <v-col :cols="12" class="ga__login_drawing_view__drawings_title">
              <div class="grey--text text--darken-1" v-if="!passIsComplete">
                Choose drawings for your
                <span
                  class="text-overline font-weight-light white--text ga__login_drawing_view__drawings_title__pass"
                  >IPASS</span
                >
              </div>
              <div class="grey--text text--darken-1" v-if="passIsComplete">
                Your
                <span
                  class="text-overline font-weight-light white--text ga__login_drawing_view__drawings_title__pass"
                  >IPASS</span
                >
                is complete!
              </div>
            </v-col>
          </v-row>
          <v-row
            :class="[
              'ga__login_drawing_view__drawings_row mt-10',
              { hidden: logoVisible },
            ]"
          >
            <v-col
              :cols="3"
              v-for="(drawingPass, index) in drawingPasses"
              :key="index"
              class="ga__login_drawing_view__drawing__content dotted_background"
            >
              <v-avatar
                :size="getSelectableDrawingsSize"
                rounded="lg"
                v-if="drawingPass"
              >
                <v-img :src="getDrawingUrl(drawingPass)" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col :cols="12" :lg="6" class="ga__login_drawing_view__drawings">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__login_drawing_view__controls"
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
            ref="loginFormBtn"
            @click="handleLoginBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Login
          </v-btn>
          <div class="ga__login_drawing_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`deep-orange darken-2`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <v-row class="ga__login_drawing_view__drawings__row" v-else>
          <v-col
            :cols="3"
            v-for="(drawing, index) in drawings"
            :key="index"
            align-self="center"
          >
            <div
              class="ga__login_drawing_view__drawing_wrapper dotted_background"
            >
              <v-avatar
                :size="getSelectableDrawingsSize"
                rounded="lg"
                @click="handleDrawingClick(drawing)"
              >
                <v-img :src="getDrawingUrl(drawing)" />
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      :class="[
        'ga__login_drawing_view__logo_container',
        { hidden: !logoIsVisible },
      ]"
    >
      <div class="ga__login_drawing_view__logo"></div>
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
  DRAWINGS_PASS_COUNT,
  GA_LOGIN_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
} from "@/config/consts";
import { mapActions, mapGetters } from "vuex";
import {
  ALREADY_CONTAINED_IN_PASS_DRAWING,
  INVALID_USERNAME_MSG,
  LOGIN_FAILED_MSG,
  USERNAME_FIRST_COMPLETED,
} from "@/config/error-messages";
import { shuffleArray } from "@/utils/array-shuffle";
import { prototype } from "vue/types/umd";
import { transformDrawingPass } from "@/utils/drawing-pass-transform";

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
      drawingsPassCount: DRAWINGS_PASS_COUNT,
      drawingPasses: [] as any,
      drawingPassLastCompletedIndex: 0,
      passAfterTransformation: "",
      foundUserDrawings: false,
      hasAnsweredBringDrawings: false,
      drawings: [] as any,
      loginErrorShows: false,
      loginErrorMsg: "Invalid username!",
      loginInProgressOverlay: false,
    };
  },

  async created() {
    await this.fetchUploadedBufferDrawings();
  },

  methods: {
    ...mapActions("authentication", ["fetchLogin"]),
    ...mapActions("drawings", ["fetchUserUploadedDrawings"]),
    ...mapActions("bufferDrawings", ["fetchUploadedBufferDrawings"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_LOGIN_ROUTE_NAME });
    },
    handleDoNotBringDrawingsYet() {
      console.log("not ready");
    },
    async handleBringDrawings() {
      if (!this.userName) {
        this.loginErrorShows = true;
        this.loginErrorMsg = USERNAME_FIRST_COMPLETED;
        return;
      }

      this.foundUserDrawings = !this.foundUserDrawings;
      await this.fetchUserUploadedDrawings(this.userName);

      // combine both the buffer drawings and the user's pass drawings
      this.drawings = shuffleArray([
        ...this.userUploadedDrawings,
        ...this.bufferDrawings,
      ]);
      console.log(this.drawings);
    },
    setUpDefaultDrawingsPass() {
      for (let index = 0; index < this.drawingsPassCount; index++) {
        this.drawingPasses.push("");
      }
    },
    handleClearBtnClick() {
      (this.drawingPasses = [] as any),
        (this.drawingPassLastCompletedIndex = 0);
      this.setUpDefaultDrawingsPass();
    },
    async submitLogin() {
      const userToBeLoggedIn = {
        userName: this.userName,
        password: this.passAfterTransformation,
      };

      try {
        let authSuccess = await this.fetchLogin(userToBeLoggedIn);
        if (authSuccess) {
          setTimeout(() => {
            this.$router.push({ name: GA_WELCOME_ROUTE_NAME });
            this.loginInProgressOverlay = false;
          }, 2000);
        }
      } catch (err) {
        setTimeout(() => {
          this.loginErrorShows = true;
          this.loginErrorMsg = LOGIN_FAILED_MSG;
          this.loginInProgressOverlay = false;
        }, 1000);
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
    handleDrawingClick(drawingFileName: string) {
      if (this.logoVisible) {
        this.logoVisible = false;
      }

      // check if pass item is already contained in the pass
      if (
        Object.entries(this.drawingPasses).find(
          (drawingPass) => drawingPass[1] === drawingFileName
        )
      ) {
        this.loginErrorShows = true;
        this.loginErrorMsg = ALREADY_CONTAINED_IN_PASS_DRAWING;
        return;
      }

      if (this.drawingPassLastCompletedIndex < this.drawingsPassCount - 1) {
        this.drawingPasses = {
          ...this.drawingPasses,
          [this.drawingPassLastCompletedIndex]: drawingFileName,
        };
        this.drawingPassLastCompletedIndex++;
      } else {
        this.drawingPasses = {
          ...this.drawingPasses,
          [this.drawingPassLastCompletedIndex]: drawingFileName,
        };
        this.drawingPassLastCompletedIndex++;

        // check if all of the drawing passes are contained in the user's uploaded drawings
        const allInUserUploadedDrawings = this.areAllInUserUploadedDrawings();

        this.passAfterTransformation = transformDrawingPass(
          Object.assign([], this.drawingPasses),
          allInUserUploadedDrawings,
          this.userUploadedDrawings
        );
      }
    },
    getDrawingUrl(currentDrawingFilename: string): string {
      const isUserUploadedDrawing = (
        this.userUploadedDrawings as string[]
      ).find((drawing) => currentDrawingFilename === drawing);
      if (isUserUploadedDrawing) {
        return `http://localhost:8080/ga/api/drawings/drawing_actual/${currentDrawingFilename}`;
      }
      return `http://localhost:8080/ga/api/buffer_drawings/buffer_drawing_actual/${currentDrawingFilename}`;
    },
    areAllInUserUploadedDrawings(): boolean {
      const drawingPassesArray = Object.entries(this.drawingPasses).map(
        (drawingPass) => drawingPass[1]
      );

      return drawingPassesArray.every((drawingPass) =>
        (this.userUploadedDrawings as string[]).find(
          (userUploadedDrawing) => userUploadedDrawing === drawingPass
        )
      );
    },
  },

  computed: {
    ...mapGetters("drawings", ["userUploadedDrawings"]),
    ...mapGetters("bufferDrawings", ["bufferDrawings"]),

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
      return this.drawingPassLastCompletedIndex === this.drawingsPassCount;
    },
    getSelectableDrawingsSize(): string {
      return this.onLargerViewPort ? "150" : "58";
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
.ga__login_drawing_view {
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
    background: linear-gradient(
      90deg,
      #4db6ac 0%,
      #9fa8da 25%,
      #ff7043 50%,
      #fff176 100%
    );

    border-top-right-radius: 45% 70%;
    border-top-left-radius: 45% 70%;

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

  &__drawings {
    &__row {
      height: 400px;
      overflow-y: auto;
    }
  }

  &__drawing_wrapper {
    border: solid 2px #ff5722;
    width: 150px;
    height: 150px;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    @media screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
      border: solid 2px #ff5722;
      border-radius: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
  }

  &__drawing_wrapper:hover {
    background: #ffab91;
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

  &__qualifier {
    vertical-align: text-bottom;
  }

  &__own_drawings {
    display: flex;
    align-items: center;
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

.hidden {
  display: none;
}

.break {
  flex-basis: 100%;
  height: 0;
  text-align: center;
}
</style>
