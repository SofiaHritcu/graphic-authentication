<template>
  <div class="ga__login_face_recogn_view">
    <v-row class="ga__login_face_recogn_view__title_row">
      <v-btn outlined :color="`indigo darken-2`" @click="handleBackBtnClick">
        Go Back To Choose IPASS
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#303F9F"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__login_face_recogn_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__login_face_recogn_view__title__text"
        >
          Login
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__login_face_recogn_view__content">
      <v-col :cols="12" :lg="6">
        <v-form v-model="validLoginForm" :ref="loginFormRef">
          <v-row class="ga__login_face_recogn_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_face_recogn_view__form_col">
              <v-text-field
                v-model="userName"
                :rules="userNameRules"
                :disabled="hasOwnImages"
                :counter="10"
                color="indigo"
                label="user name"
                required
                filled
                dark
                class="ga__login_face_recogn_view__form_field"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="!hasAnsweredOwnImages">
            <div
              class="grey--text text--darken-1 mb-2 ga__login_face_recogn_view__own_images"
            >
              <fa-icon
                icon="fa-solid fa-id-badge"
                class="fa-beat-fade mr-2"
                size="2x"
              />
              <span
                class="text-overline font-weight-light indigo--text text--darken-5 ga__login_face_recogn_view__qualifier"
              >
                Do you have your own images PASS?
              </span>
              <v-btn
                class="white--text mr-4 ml-2"
                outlined
                x-small
                :color="`red lighten-2`"
                @click="handleDoesNotHaveOwnImages"
              >
                no
              </v-btn>
              <v-btn
                class="white--text"
                outlined
                x-small
                :color="`green lighten-2`"
                @click="handleHasOwnImages"
              >
                yes
              </v-btn>
            </div>
          </v-row>
          <v-row class="ga__login_face_recogn_view__form_row" justify="center">
            <v-col :cols="8" class="ga__login_face_recogn_view__form_col">
              <v-select
                :items="imageCategoriesItems"
                :value="imageCategoriesItems[0]"
                :disabled="hasOwnImages"
                label="face images category"
                color="indigo"
                item-color="indigo"
                hint="Select the face images category in order to build up your pass"
                persistent-hint
                required
                filled
                dark
                @change="handleImageCategoryChange"
              ></v-select>
            </v-col>
          </v-row>
          <v-row :class="[{ hidden: logoVisible }]">
            <v-col :cols="12" class="ga__login_face_recogn_view__images_title">
              <div class="grey--text text--darken-1" v-if="!passIsComplete">
                Choose faces for your
                <span
                  class="text-overline font-weight-light white--text ga__login_face_recogn_view__images_title__pass"
                  >IPASS</span
                >
              </div>
              <div class="grey--text text--darken-1" v-if="passIsComplete">
                Your
                <span
                  class="text-overline font-weight-light white--text ga__login_face_recogn_view__images_title__pass"
                  >IPASS</span
                >
                is complete!
              </div>
              <div class="grey--text text--darken-1 mt-4" v-if="passIsComplete">
                <fa-icon
                  icon="fa-solid fa-shield-halved"
                  class="fa-beat-fade mr-4"
                  :color="imagePassStrengthInterval.color"
                  size="3x"
                  pulsate
                />
                <span
                  :class="`text-overline font-weight-light ${imagePassStrengthInterval.vColor}--text text--${imagePassStrengthInterval.vOpacity} ga__login_face_recogn_view__qualifier`"
                >
                  {{ imagePassStrengthInterval.qualifying }}
                </span>
              </div>
            </v-col>
          </v-row>
          <v-row
            :class="[
              'ga__login_face_recogn_view__images_row',
              { hidden: logoVisible },
            ]"
          >
            <v-col
              :cols="2"
              v-for="(imagePass, index) in imagePasses"
              :key="index"
              class="ga__login_face_recogn_view__image__content"
            >
              <v-avatar
                :size="getSelectableImagesSize"
                rounded="lg"
                v-if="imagePass"
              >
                <div
                  v-if="imagePassesToBeHidden[index]"
                  class="pass_item__hidden"
                ></div>
                <v-img v-else :src="getUrlByCurrentCategory(imagePass)" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-row
            v-if="passIsComplete"
            class="ga__login_face_recogn_view__show_pass_row"
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
      <v-col :cols="12" :lg="6" class="ga__login_face_recogn_view__images">
        <v-row
          v-if="passIsComplete"
          justify="center"
          class="ga__login_face_recogn_view__controls"
        >
          <div
            v-if="onLargerViewPort"
            class="text-overline font-weight-light white--text break"
          >
            What next ?
          </div>
          <v-btn
            outlined
            :color="`indigo darken-2`"
            ref="loginFormBtn"
            @click="handleLoginBtnClick"
            class="mr-sm-4 mb-xs-4"
          >
            Login
          </v-btn>
          <div class="ga__login_face_recogn_view__controls__separator">/</div>
          <v-btn
            outlined
            :color="`indigo darken-2`"
            @click="handleClearBtnClick"
            class="ml-sm-4"
          >
            Clear PASS
          </v-btn>
        </v-row>
        <v-row class="ga__login_face_recogn_view__images__row" v-else>
          <v-col
            :cols="3"
            v-for="(currentImage, index) in currentImages"
            :key="index"
            align-self="center"
          >
            <div class="ga__login_face_recogn_view__image_wrapper">
              <v-avatar
                :size="getSelectableImagesSize"
                rounded="lg"
                @click="
                  currentCategory === 'my own people'
                    ? handleImageClick(currentImage)
                    : handleImageClick(currentImage.filename)
                "
              >
                <v-img
                  :src="
                    currentCategory === 'my own people'
                      ? getUrlByCurrentCategory(currentImage)
                      : getUrlByCurrentCategory(currentImage.filename)
                  "
                />
              </v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      :class="[
        'ga__login_face_recogn_view__logo_container',
        { hidden: !logoIsVisible },
      ]"
    >
      <div class="ga__login_face_recogn_view__logo"></div>
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
  GA_LOGGED_IN_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_PEOPLE_IMAGE_CATEGORY,
  GA_UPLOADED_IMAGE_CATEGORY,
  GA_WELCOME_ROUTE_NAME,
  IMAGES_PASS_COUNT,
} from "@/config/consts";
import {
  DOES_NOT_HAVE_IMAGES_UPLOADED,
  INVALID_USERNAME_MSG,
  LOGIN_FAILED_MSG,
  USERNAME_FIRST_COMPLETED,
} from "@/config/error-messages";
import { transformImagePass } from "@/utils/image-pass-transform";
import { getImagePassStrengthInterval } from "@/utils/pass-strength-color";
import { shuffleArray } from "@/utils/array-shuffle";

export default Vue.extend({
  name: "GALoginFaceRecognView",
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
      imageCategoriesItems: [] as any[],
      logoVisible: true,
      imagePassCount: IMAGES_PASS_COUNT,
      currentImages: [] as any,
      currentCategory: "",
      imagePasses: [] as any,
      imageItems: [],
      imagePassesToBeHidden: [] as any,
      imagePassLastCompletedIndex: 0,
      passAfterTransformation: "",
      imagePassStrengthInterval: null as any,
      hasOwnImages: false,
      hasAnsweredOwnImages: false,
      ownImagesFetched: false,
      loginErrorShows: false,
      loginErrorMsg: "Invalid username!",
      loginInProgressOverlay: false,
    };
  },
  async created() {
    this.setUpDefaultImagesPass();
    await this.setUpImagesCategories();
    await this.fetchBufferPeopleFacesImages();
  },
  methods: {
    ...mapActions("images", [
      "fetchFaceImagesCategories",
      "fetchImagesByCategory",
      "fetchUserUploadedImages",
      "fetchBufferPeopleFacesImages",
    ]),
    ...mapActions("authentication", ["fetchLogin"]),

    async handleBackBtnClick() {
      await this.$router.push({ name: GA_LOGIN_ROUTE_NAME });
    },
    async setUpImagesCategories() {
      this.fetchFaceImagesCategories().then(async (res) => {
        if (res) {
          this.imageCategoriesItems = this.imagesCategories.map(
            (ic: GA.ImageCategoryBase) => ic.label
          );

          // setup default images category
          await this.fetchImagesByCategory("people");
          this.currentCategory = "people";
          this.currentImages = this.peopleFacesImages;
        }
      });
    },
    setUpDefaultImagesPass() {
      for (let index = 0; index < this.imagePassCount; index++) {
        this.imagePasses.push("");
      }
    },
    async handleImageCategoryChange(imageCategorySelected: string) {
      if (this.logoVisible) {
        this.logoVisible = false;
      }

      if (imageCategorySelected !== "my own people") {
        await this.fetchImagesByCategory(imageCategorySelected);
      }

      this.currentCategory = imageCategorySelected;
      this.setCurrentImages(imageCategorySelected);
    },
    handleSeePass() {
      for (const imagePassToBeHidden in this.imagePassesToBeHidden) {
        this.imagePassesToBeHidden[imagePassToBeHidden] =
          !this.imagePassesToBeHidden[imagePassToBeHidden];
      }
      if (!this.imagePassesToBeHidden[0]) {
        setTimeout(() => {
          for (const imagePassToBeHidden in this.imagePassesToBeHidden) {
            this.imagePassesToBeHidden[imagePassToBeHidden] =
              !this.imagePassesToBeHidden[imagePassToBeHidden];
          }
        }, 400);
      }
    },
    hidePassItem() {
      setTimeout(() => {
        this.imagePassesToBeHidden = {
          ...this.imagePassesToBeHidden,
          [this.imagePassLastCompletedIndex - 1]: true,
        };
      }, 200);
    },
    handleImageClick(imageItemFileName: string) {
      if (this.logoVisible) {
        this.logoVisible = false;
      }
      if (this.imagePassLastCompletedIndex < this.imagePassCount - 1) {
        this.imagePasses = {
          ...this.imagePasses,
          [this.imagePassLastCompletedIndex]: imageItemFileName,
        };
        this.imagePassLastCompletedIndex++;
      } else {
        this.imagePasses = {
          ...this.imagePasses,
          [this.imagePassLastCompletedIndex]: imageItemFileName,
        };
        this.imagePassLastCompletedIndex++;
        this.passAfterTransformation = transformImagePass(
          Object.assign([], this.imagePasses)
        );
        this.imagePassStrengthInterval = getImagePassStrengthInterval(
          this.passAfterTransformation
        );
      }
      this.hidePassItem();
    },
    handleClearBtnClick() {
      (this.imagePasses = [] as any), (this.imagePassLastCompletedIndex = 0);
      this.imagePassesToBeHidden = [] as any;
      this.setUpDefaultImagesPass();
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
    async handleHasOwnImages() {
      if (!this.userName) {
        this.loginErrorShows = true;
        this.loginErrorMsg = USERNAME_FIRST_COMPLETED;
        return;
      }
      this.hasAnsweredOwnImages = !this.hasAnsweredOwnImages;
      this.hasOwnImages = !this.hasOwnImages;

      // fetch uploaded images of user
      try {
        let userHasImages = await this.fetchUserUploadedImages(this.userName);
        if (userHasImages) {
          // set the default category to be my own uploaded faces
          this.ownImagesFetched = true;
          this.imageCategoriesItems = [
            "my own people",
            ...this.imageCategoriesItems,
          ];

          this.currentCategory = "my own people";
          this.currentImages = shuffleArray([
            ...this.userUploadedImages,
            ...this.bufferPeopleFacesImages,
          ]);
        }
      } catch (err) {
        this.loginErrorShows = true;
        this.loginErrorMsg = DOES_NOT_HAVE_IMAGES_UPLOADED;
      }
    },
    handleDoesNotHaveOwnImages() {
      this.hasAnsweredOwnImages = !this.hasAnsweredOwnImages;
      this.hasOwnImages = !this.hasOwnImages;
    },
    setCurrentImages(imageCategorySelected: string) {
      switch (imageCategorySelected) {
        case GA_UPLOADED_IMAGE_CATEGORY:
          this.currentImages = shuffleArray(
            (this.currentImages = [
              ...this.userUploadedImages,
              ...this.bufferPeopleFacesImages,
            ])
          );
          break;
        case GA_PEOPLE_IMAGE_CATEGORY:
          this.currentImages = this.peopleFacesImages;
          break;
      }
    },
    getUrlByCurrentCategory(currentImageFilename: string): string {
      let currentCategoryUrl = "";
      switch (this.currentCategory) {
        case GA_UPLOADED_IMAGE_CATEGORY:
          currentCategoryUrl = "uploaded_actual_image";
          break;
        case GA_PEOPLE_IMAGE_CATEGORY:
          currentCategoryUrl = "people_faces_actual_image";
          break;
      }
      return `http://localhost:8080/ga/api/images/${currentCategoryUrl}/${currentImageFilename}`;
    },
  },
  computed: {
    ...mapGetters("images", [
      "imagesCategories",
      "peopleFacesImages",
      "uploadedImages",
      "userUploadedImages",
      "bufferPeopleFacesImages",
    ]),
    onLargerViewPort(): boolean {
      return (
        // @ts-ignore
        this.$vuetify.breakpoint.name === "lg" ||
        // @ts-ignore
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    logoIsVisible(): boolean {
      return this.logoVisible && this.onLargerViewPort;
    },
    passIsComplete(): boolean {
      return this.imagePassLastCompletedIndex === this.imagePassCount;
    },
    getSelectableImagesSize(): string {
      return this.onLargerViewPort ? "100" : "58";
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__login_face_recogn_view {
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

  &__images_title {
    text-align: center;

    &__pass {
      font-size: 1.5rem !important;
      margin-left: 1%;
    }
  }

  &__images_row {
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 0;
  }

  &__image {
    &__content {
      border: #303f9f 1px solid;
      height: 7rem;
      background: rgba(255, 255, 255, 0.08);
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

  &__images {
    &__row {
      height: 450px;
      overflow-y: auto;
    }
  }

  &__image_wrapper {
    border: solid 2px #303f9f;
    width: 120px;
    height: 120px;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    @media screen and (max-width: 768px) {
      width: 90px;
      height: 90px;
      border: solid 2px #303f9f;
      border-radius: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
  }

  &__image_wrapper:hover {
    background: #5c6bc0;
    cursor: pointer;
  }

  &__controls {
    height: 100%;
    width: 50%;
    margin: auto;
    align-items: center;

    @media screen and (min-width: 1264px) {
      background: linear-gradient(0deg, #9fa8da 0%, #5c6bc0 100%);
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

  &__own_images {
    display: flex;
    align-items: center;
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
