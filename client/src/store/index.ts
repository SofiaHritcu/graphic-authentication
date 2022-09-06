import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { authentication } from "./modules/authentication";
import { icons } from "./modules/icons";
import { images } from "./modules/images";
import { drawings } from "./modules/drawings";
import { drawingsSimilarity } from "./modules/drawings_similarity";
import { bufferDrawings } from "./modules/buffer_drawings";
import { passPoints } from "./modules/pass_points";

Vue.use(Vuex);

const store: StoreOptions<GA.RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    authentication,
    icons,
    images,
    drawings,
    drawingsSimilarity,
    bufferDrawings,
    passPoints,
  },
};

export default new Vuex.Store<GA.RootState>(store);
