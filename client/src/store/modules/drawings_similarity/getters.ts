import { Getter, GetterTree } from "vuex";

export const similarityLevel: Getter<
  GA.DrawingsSimilarityState,
  GA.RootState
> = (state): any => state.similarityLevel;

export const sameSimilarityDrawings: Getter<
  GA.DrawingsSimilarityState,
  GA.RootState
> = (state): string[] => state.sameSimilarityDrawings;

export const getters: GetterTree<GA.DrawingsSimilarityState, GA.RootState> = {
  similarityLevel,
  sameSimilarityDrawings,
};
