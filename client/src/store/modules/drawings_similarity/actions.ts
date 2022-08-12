import { DRAWINGS_PASS_STRENGTH_INTERVALS } from "@/config/pass-strength-intervals";
import { fetcHDeepAI } from "@/utils/deep-ai-helper";
import axios from "axios";
import { ActionHandler, ActionTree, Commit } from "vuex";

export const fetchUploadedDrawingsSimilarity: ActionHandler<
  GA.DrawingsSimilarityState,
  GA.RootState
> = async ({ commit }, drawingFilenames: string[]): Promise<void> => {
  const foundVerySimilarDrawings = new Set<string>();
  const foundSimilarDrawings = new Set<string>();
  const foundCompletelyDifferentDrawings = new Set<string>();

  for (let i = 0; i < drawingFilenames.length - 1; i++) {
    const currentDrawing = drawingFilenames[i];
    for (let j = i + 1; j < drawingFilenames.length; j++) {
      const toBeComparedToDrawing = drawingFilenames[j];

      // step 1. determine similarity - call deep-api
      const similarity = await fetcHDeepAI(
        `/ga/api/drawings/drawing_actual/${currentDrawing}`,
        `/ga/api/drawings/drawing_actual/${toBeComparedToDrawing}`
      );

      if (similarity >= 0 && similarity <= 10) {
        foundVerySimilarDrawings.add(currentDrawing);
        foundVerySimilarDrawings.add(toBeComparedToDrawing);
      } else if (similarity > 10 && similarity <= 20) {
        foundSimilarDrawings.add(currentDrawing);
        foundSimilarDrawings.add(toBeComparedToDrawing);
      } else {
        foundCompletelyDifferentDrawings.add(currentDrawing);
        foundCompletelyDifferentDrawings.add(toBeComparedToDrawing);
      }
    }
  }

  // step 2. decide overall level of similarity
  if (
    foundVerySimilarDrawings.size == 3 ||
    foundVerySimilarDrawings.size == 4
  ) {
    commit("setSimilarityLevel", DRAWINGS_PASS_STRENGTH_INTERVALS[0]);
    commit("setSameSimilarityDrawings", foundVerySimilarDrawings);
  } else if (foundSimilarDrawings.size >= 2 && foundSimilarDrawings.size <= 4) {
    commit("setSimilarityLevel", DRAWINGS_PASS_STRENGTH_INTERVALS[1]);
    commit("setSameSimilarityDrawings", foundSimilarDrawings);
  } else {
    commit("setSimilarityLevel", DRAWINGS_PASS_STRENGTH_INTERVALS[2]);
    commit("setSameSimilarityDrawings", foundCompletelyDifferentDrawings);
  }
};

export const actions: ActionTree<GA.DrawingsSimilarityState, GA.RootState> = {
  fetchUploadedDrawingsSimilarity,
};
