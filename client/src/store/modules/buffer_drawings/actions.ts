import axios from "axios";
import { ActionHandler, ActionTree, Commit } from "vuex";

export const fetchUploadedBufferDrawings: ActionHandler<
  GA.BufferDrawingsState,
  GA.RootState
> = async ({ commit }): Promise<void> => {
  const response = await axios.get(`/ga/api/buffer_drawings/uploaded_drawings`);

  if (response.data.success) {
    const uploadedBufferDrawings =
      response.data.uploadedBufferDrawing[0].bufferDrawingsFilenames;
    commit("setBufferDrawings", uploadedBufferDrawings);
  }

  return response.data.success;
};

export const actions: ActionTree<GA.BufferDrawingsState, GA.RootState> = {
  fetchUploadedBufferDrawings,
};
