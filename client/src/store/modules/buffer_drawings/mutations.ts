import { Mutation, MutationTree } from "vuex";

export const setBufferDrawings: Mutation<GA.BufferDrawingsState> = (
  state,
  bufferDrawings: string[]
): void => {
  state.bufferDrawings = bufferDrawings;
};

export const mutations: MutationTree<GA.BufferDrawingsState> = {
  setBufferDrawings,
};
