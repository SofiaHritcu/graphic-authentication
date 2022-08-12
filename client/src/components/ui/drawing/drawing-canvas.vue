<template>
  <div class="ga__drawing_canvas">
    <div
      class="ga__drawing_canvas__border_gradient"
      @mousedown="handleFirstClick"
    >
      <div v-if="firstClick" class="ga__drawing_canvas__drawing_placeholder">
        <div class="overline blue-grey--text">Draw your pass</div>
        <fa-icon
          icon="fa-solid fa-paintbrush"
          color="blue-grey"
          class="fa-beat-fade"
          size="lg"
        />
      </div>
      <vue-signature-pad
        v-else
        id="signature"
        width="100%"
        height="500px"
        ref="signaturePad"
        :options="options"
      />
    </div>
    <div class="ga__drawing_canvas__buttons">
      <v-btn outlined color="yellow lighten-2" @click="undo" class="mr-2">
        Undo
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-arrow-left"
          color="yellow lighten-2"
          size="lg"
        />
      </v-btn>
      <v-btn outlined color="deep-orange lighten-1" @click="clear" class="mr-2">
        Clear
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-trash"
          color="deep-orange lighten-1"
          size="lg"
        />
      </v-btn>
      <v-dialog v-model="colorPickerDialogIsOpen" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="teal lighten-2"
            class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
            Change Color
            <fa-icon
              class="ml-2"
              icon="fa-solid fa-eye-dropper"
              color="teal lighten-2"
              size="lg"
            />
          </v-btn>
        </template>

        <v-color-picker
          class="ma-2"
          show-swatches
          width="480"
          :value="currentColor"
          @input="handleColorPickerInput"
        ></v-color-picker>
      </v-dialog>
      <v-btn outlined color="indigo lighten-2" @click="save" class="mr-2">
        Save
        <fa-icon
          class="ml-2"
          icon="fa-solid fa-floppy-disk"
          color="indigo lighten-2"
          size="lg"
        />
      </v-btn>
      <v-slider v-model="size" min="1" thumb-label :color="currentColor" dark>
        <template slot="append">
          <fa-icon
            class="mr-4"
            icon="fa-solid fa-brush"
            :color="currentColor"
            size="lg"
            @change="handleSizeChange"
          />
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {},
  name: "GADrawingCanvas",

  data() {
    return {
      currentColor: "#000000",
      firstClick: true,
      colorPickerDialogIsOpen: false,
      size: 10,
    };
  },

  methods: {
    handleFirstClick() {
      if (this.firstClick) {
        this.firstClick = !this.firstClick;
      }
    },
    handleColorPickerInput(newColor: string) {
      this.currentColor = newColor;
    },
    handleSizeChange(newSize: number) {
      this.size = newSize;
    },
    toDataURL() {
      // @ts-ignore
      const dataURL = this.$refs.signaturePad.value.toDataURL();
    },
    undo() {
      // @ts-ignore
      this.$refs.signaturePad!.undoSignature();
    },
    clear() {
      // @ts-ignore
      this.$refs.signaturePad!.clearSignature();
    },
    save() {
      // @ts-ignore
      const { isEmpty, data } = this.$refs.signaturePad!.saveSignature();
      this.$emit("drawing-saved", isEmpty, data);
      // @ts-ignore
      this.$refs.signaturePad!.clearSignature();
    },
  },

  computed: {
    options() {
      return {
        penColor: this.currentColor,
        maxWidth: this.size,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.ga__drawing_canvas {
  height: 100%;

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

  &__buttons {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }

  &__drawing_placeholder {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
