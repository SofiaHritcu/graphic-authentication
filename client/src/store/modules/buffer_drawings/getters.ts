import { Getter, GetterTree } from "vuex";

export const bufferDrawings: Getter<GA.BufferDrawingsState, GA.RootState> = (
  state
): string[] => state.bufferDrawings;

export const getters: GetterTree<GA.BufferDrawingsState, GA.RootState> = {
  bufferDrawings,
};
