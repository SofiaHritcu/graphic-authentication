import { Module } from "vuex";
import { getters } from "./getters";
import { initialState } from "./initial-state";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const passPoints: Module<GA.PassPointsState, GA.RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
