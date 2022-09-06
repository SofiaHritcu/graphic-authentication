<template>
  <div class="ga__pass_points">
    <div class="ga__pass_points__border_gradient">
      <div
        v-if="!selectedUploadImage"
        class="ga__pass_points__image_upload_placeholder"
        @click="selectedUploadImage = !selectedUploadImage"
      >
        <div class="overline blue-grey--text">Upload your image</div>
        <fa-icon
          icon="fa-solid fa-image"
          color="blue-grey"
          class="fa-beat-fade"
          size="lg"
        />
      </div>
      <v-row class="ga__pass_points__content" v-else>
        <v-col :sm="12" :md="6" :offset-md="3">
          <v-form class="ga__pass_points__form">
            <v-file-input
              v-model="imageToBeUploaded"
              small-chips
              accept="image/png, image/jpeg, image/bmp"
              :color="`amber lighten-2`"
              name="file"
              label="Upload your pass-point image here"
              class="ga__pass_points__form__input"
              @change="handleImageChosed"
            >
              <template slot="prepend-inner"
                ><fa-icon
                  class="mr-4"
                  icon="fa-solid fa-camera-retro"
                  color="#FFA000"
                  size="lg"
              /></template>
            </v-file-input>
            <div class="ga__pass_points__upload_preview">
              <v-img
                v-if="imageToBeUploadedUrl"
                :src="imageToBeUploadedUrl"
                height="200"
                width="200"
              />
              <v-img
                v-else
                :src="imagePlaceholder"
                height="100"
                width="100"
                class="ga__pass_points__placeholder"
              />
              <v-progress-circular
                v-if="uploadingImage"
                :size="100"
                :width="7"
                color="amber"
                indeterminate
                class="ga__pass_points__placeholder"
              ></v-progress-circular>
            </div>
            <v-btn
              @click="handleUploadImageClick"
              outlined
              :color="`amber darken-2`"
              class="ga__pass_points__form__button mt-4"
            >
              UPLOAD
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <v-overlay :value="containsTextOverlay" :opacity="0.95">
      <div class="ga__pass_points__overlay__animated">
        <particles-bg type="cobweb" :canvas="{ zIndex: 1 }" color="#455A64" />
      </div>
      <div class="ga__pass_points__overlay__content">
        <div>
          <span
            :class="`text-overline font-weight-light amber--text text--darken-2 ga__pass_points__overlay_text`"
          >
            YOUR IMAGE CONTAINS TEXT! THIS IS NOT SECURE FOR YOUR IPASS!
          </span>
        </div>
        <div class="mt-4">
          <span
            :class="`font-weight-light white--text text--darken-2 ga__pass_points__overlay_text`"
          >
            Please re-upload
          </span>
        </div>
        <div class="mt-6">
          <v-btn
            outlined
            color="blue-grey darken-3"
            @click="handleCloseAfterContainsTextOverlay"
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
import { mapActions, mapGetters } from "vuex";
// @ts-ignore
import { ParticlesBg } from "particles-bg-vue";

export default Vue.extend({
  components: { ParticlesBg },
  name: "GAPassPoints",

  data() {
    return {
      selectedUploadImage: false,
      imageUploadInputRef: "imageUploadInputRef",
      imageToBeUploaded: null,
      imageToBeUploadedUrl: "",
      imagePlaceholder: require("../../../assets/pass_points_image_preview.png"),
      uploadingImage: false,
      uploadErrorShows: false,
      uploadErrorMsg: "Invalid file type!",
      showLeavingViewOverlay: false,
      containsTextOverlay: false,
    };
  },

  methods: {
    ...mapActions("passPoints", [
      "fetchUploadPassPointImage",
      "fetchTextRecogn",
    ]),

    async handleUploadImageClick() {
      if (!this.imageToBeUploaded) {
        this.uploadErrorShows = !this.uploadErrorShows;
        this.uploadErrorMsg = "First, you have to choose a file!";
        return;
      }
      this.uploadingImage = true;
      await this.fetchTextRecogn({
        passPointImageFile: this.imageToBeUploaded,
      });
      if (!this.uploadedImageContainsText) {
        await this.fetchUploadPassPointImage({
          passPointImage: this.imageToBeUploaded,
        });
        localStorage.setItem("GA-uploaded-pass-point", "true");
        localStorage.setItem(
          "GA-uploaded-pass-point-image",
          this.uploadedImage
        );
      } else {
        this.containsTextOverlay = true;
      }
      this.uploadingImage = false;
      this.imageToBeUploaded = null;
      this.imageToBeUploadedUrl = "";
    },

    handleImageChosed() {
      this.imageToBeUploadedUrl = this.imageToBeUploaded
        ? URL.createObjectURL(this.imageToBeUploaded!)
        : "";
    },
    handleCloseAfterContainsTextOverlay() {
      this.containsTextOverlay = !this.containsTextOverlay;
    },
  },

  computed: {
    ...mapGetters("passPoints", ["uploadedImage", "uploadedImageContainsText"]),
  },
});
</script>

<style lang="scss" scoped>
.ga__pass_points {
  height: 100%;
  width: 100%;

  &__border_gradient {
    height: 100%;
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

  &__form {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding-top: 10%;

    &__button {
      width: 50%;
    }

    &__input {
      width: 100%;
      margin-left: -33px;
    }
  }

  &__image_upload_placeholder {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__image_upload_placeholder:hover {
    cursor: pointer;
  }

  &__upload_preview {
    width: 250px;
    height: 250px;
    border: 2px solid #ffa000;
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
      text-align: center;
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
  }
}
</style>
