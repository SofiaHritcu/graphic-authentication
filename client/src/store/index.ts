import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { authentication } from "./modules/authentication";
import { icons } from "./modules/icons";
import { images } from "./modules/images";

Vue.use(Vuex);

const store: StoreOptions<GA.RootState> = {
  state: {
    version: "1.0.0",
  },
  modules: {
    authentication,
    icons,
    images,
  },
};

export default new Vuex.Store<GA.RootState>(store);
