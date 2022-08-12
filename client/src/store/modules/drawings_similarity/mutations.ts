import { Mutation, MutationTree } from "vuex";

export const setSimilarityLevel: Mutation<GA.DrawingsSimilarityState> = (
  state,
  similarityLevel: any
): void => {
  state.similarityLevel = similarityLevel;
};

export const setSameSimilarityDrawings: Mutation<GA.DrawingsSimilarityState> = (
  state,
  sameSimilarityDrawings: string[]
): void => {
  state.sameSimilarityDrawings = sameSimilarityDrawings;
};

export const mutations: MutationTree<GA.DrawingsSimilarityState> = {
  setSimilarityLevel,
  setSameSimilarityDrawings,
};
