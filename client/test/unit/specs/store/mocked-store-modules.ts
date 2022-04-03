import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { iconsMock } from "./mock-modules/icons/icons-mock-store";
import { authenticationMock } from "./mock-modules/authentication/authentication-mock-store";

export const mockStore: StoreOptions<GA.MockStoreState> = {
  modules: {
    icons: iconsMock,
    authentication: authenticationMock,
  },
};

Vue.use(Vuex);
export default new Vuex.Store(mockStore);