import { Module } from "vuex";
import { getters } from "./getters";
import { initialState } from "./initial-state";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const icons: Module<GA.IconsState, GA.RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
