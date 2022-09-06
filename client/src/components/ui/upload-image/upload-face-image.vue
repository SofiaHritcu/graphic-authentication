<template>
  <div class="ga__upload_face_image_view">
    <v-row class="ga__upload_face_image_view__title_row">
      <v-btn outlined :color="`indigo lighten-2`" @click="handleBackBtnClick">
        Go Back To IPASS Sign Up
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-rotate-left"
          color="#7986CB"
          size="lg"
        />
      </v-btn>
    </v-row>
    <v-row
      class="ga__upload_face_image_view__title"
      align-content="center"
      justify="center"
    >
      <v-col :cols="12">
        <div
          class="text-overline white--text text--darken-1 ga__upload_face_image_view__title__text"
        >
          Upload your own faces
        </div>
      </v-col>
    </v-row>
    <v-row class="ga__upload_face_image_view__content">
      <v-col :sm="12" :md="6" :offset-md="3">
        <v-form class="ga__upload_face_image_view__form">
          <v-file-input
            v-model="faceImageToBeUploaded"
            dark
            small-chips
            accept="image/png, image/jpeg, image/bmp"
            :color="`indigo lighten-2`"
            name="file"
            label="Upload your face image here"
            class="ga__upload_face_image_view__form__input"
            @change="handleFaceImageChosed"
          >
            <template slot="prepend-inner"
              ><fa-icon
                class="mr-4"
                icon="fa-solid fa-camera-retro"
                color="#7986CB"
                size="lg"
            /></template>
          </v-file-input>
          <div class="ga__upload_face_image_view__upload_preview">
            <v-img
              v-if="faceImageToBeUploadedUrl"
              :src="faceImageToBeUploadedUrl"
              height="200"
              width="200"
            />
            <v-img
              v-else
              :src="faceImagePlaceholder"
              height="100"
              width="100"
              class="ga__upload_face_image_view__placeholder"
            />
            <v-progress-circular
              v-if="uploadingFaceImage"
              :size="100"
              :width="7"
              color="indigo"
              indeterminate
              class="ga__upload_face_image_view__placeholder"
            ></v-progress-circular>
          </div>
          <v-btn
            @click="handleUploadFaceImageClick"
            outlined
            :color="`indigo lighten-2`"
            class="ga__upload_face_image_view__form__button mt-4"
          >
            UPLOAD
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        :cols="3"
        v-for="(uploadedFaceImage, index) in uploadedFaceImages"
        :key="index"
        align-self="center"
      >
        <div class="ga__upload_face_image_view__image_wrapper">
          <v-avatar :size="getUploadedImageSize" rounded="lg">
            <v-img
              :src="`https://sleepy-hollows-64004.herokuapp.com/ga/api/images/uploaded_actual_image/${uploadedFaceImage}`"
            />
          </v-avatar>
        </div>
      </v-col>
    </v-row>
    <div
      :class="[
        'ga__signup_face_recogn_view__logo_container',
        { hidden: !logoIsVisible },
      ]"
    >
      <div class="ga__signup_face_recogn_view__logo"></div>
    </div>
    <v-snackbar v-model="uploadErrorShows">
      {{ uploadErrorMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red darken-3"
          text
          :timeout="5000"
          v-bind="attrs"
          @click="uploadErrorShows = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="showLeavingViewOverlay" z-index="0" opacity="0.85">
      <div class="ga__upload_face_image_view__overlay__animated">
        <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
      </div>
      <div class="ga__upload_face_image_view__overlay__content">
        <div v-if="faceImageToBeUploaded">
          <div class="text-overline indigo--text text--lighten-2">
            You've left an face image not saved.
          </div>
          <div
            class="text-overline indigo--text text--lighten-2 ga__upload_face_image_view__overlay__centered"
          >
            Are you sure you want to leave?
          </div>
        </div>
        <div v-if="!faceImageToBeUploaded">
          <div class="text-overline indigo--text text--lighten-2">
            Are you sure you've finished uploading your face images?
          </div>
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
            @click="handleLeaveUploadFaceImage"
          >
            yes
          </v-btn>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { GA_SIGNUP_FACE_RECOGN_ROUTE_NAME } from "@/config/consts";
// @ts-ignore
import { ParticlesBg } from "particles-bg-vue";

export default Vue.extend({
  components: { ParticlesBg },
  name: "GAUploadFaceView",
  data() {
    return {
      logoVisible: true,
      faceImageUploadInputRef: "faceImageUploadInputRef",
      faceImageToBeUploaded: null,
      faceImageToBeUploadedUrl: "",
      faceImagePlaceholder: require("../../../assets/face_image_preview.png"),
      uploadingFaceImage: false,
      uploadErrorShows: false,
      uploadErrorMsg: "Invalid file type!",
      showLeavingViewOverlay: false,
    };
  },
  methods: {
    ...mapActions("images", ["fetchUploadImage"]),

    handleBackBtnClick() {
      this.showLeavingViewOverlay = !this.showLeavingViewOverlay;
    },

    async handleLeaveUploadFaceImage() {
      localStorage.setItem(
        "GA-user-uploaded-face-images",
        JSON.stringify(this.uploadedFaceImages)
      );
      await this.$router.push({ name: GA_SIGNUP_FACE_RECOGN_ROUTE_NAME });
    },

    async handleUploadFaceImageClick() {
      if (!this.faceImageToBeUploaded) {
        this.uploadErrorShows = !this.uploadErrorShows;
        this.uploadErrorMsg = "First, you have to choose a file!";
        return;
      }
      this.uploadingFaceImage = true;
      await this.fetchUploadImage({
        image: this.faceImageToBeUploaded,
        bucketName: "uploaded_images",
      });
      localStorage.setItem("GA-uploaded-face-images", "true");
      this.uploadingFaceImage = false;
      this.faceImageToBeUploaded = null;
      this.faceImageToBeUploadedUrl = "";
    },

    handleFaceImageChosed() {
      this.faceImageToBeUploadedUrl = this.faceImageToBeUploaded
        ? URL.createObjectURL(this.faceImageToBeUploaded!)
        : "";
    },
  },
  computed: {
    ...mapGetters("images", ["uploadedFaceImages"]),
    onLargerViewPort(): boolean {
      return (
        this.$vuetify.breakpoint.name === "lg" ||
        this.$vuetify.breakpoint.name === "xl"
      );
    },
    logoIsVisible(): boolean {
      return this.logoVisible && this.onLargerViewPort;
    },
    getUploadedImageSize(): string {
      return this.onLargerViewPort ? "100" : "58";
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__upload_face_image_view {
  $icon-size: 200px;
  height: 100%;
  margin-top: -10px;
  &__title_row {
    margin: 0;
  }

  &__title {
    text-align: center;
    margin: 0;
    &__text {
      font-size: 1.5rem !important;
      padding-bottom: 2%;

      @media screen and (max-width: 600px) {
        font-size: 1.3rem !important;
        padding-bottom: 2%;
      }
      @media screen and (min-width: 600px) and (max-width: 1264px) {
        font-size: 1rem !important;
        padding-bottom: 2%;
      }
    }
  }

  &__content {
    margin: 0;
  }

  &__form {
    display: flex;
    flex-flow: column wrap;
    align-items: center;

    &__button {
      width: 50%;
    }

    &__input {
      width: 100%;
      margin-left: -33px;
    }
  }

  &__upload_preview {
    width: 250px;
    height: 250px;
    border: 2px solid #7986cb;
    border-radius: 10%;
    position: relative;
  }

  &__upload_preview > div {
    position: absolute;
    border-radius: 10%;
    right: 25px;
    top: 25px;
  }

  &__placeholder {
    position: absolute;
    border-radius: 10%;
    right: 70px !important;
    top: 75px !important;
    opacity: 0.7;
  }

  &__image_wrapper {
    border: solid 2px #7986cb;
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
      border: solid 2px #7986cb;
      border-radius: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
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

.hidden {
  display: none;
}

.break {
  flex-basis: 100%;
  height: 0;
  text-align: center;
}
</style>
