import { dataUrlToFile } from "@/utils/file-utils";
import axios from "axios";
import { ActionHandler, ActionTree, Commit } from "vuex";

const doFetchUploadedDrawings = async (commit: Commit): Promise<void> => {
  const response = await axios.get("/ga/api/drawings/uploaded_drawings");
  if (response.data.success) {
    const uploadedDrawings = response.data.uploadedDrawings;

    commit("setUploadedDrawings", uploadedDrawings);
  }
  return response.data.success;
};

export const doFetchActualDrawing = async (
  commit: Commit,
  drawingFilename: any
): Promise<void | null> => {
  const response = await axios.get(
    `/ga/api/drawings/drawing_actual/${drawingFilename}`
  );
  if (response) {
    const actualDrawingFound = response.data;

    return actualDrawingFound;
  }
  return null;
};

export const fetchUploadDrawing: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = async ({ commit }, { drawing }): Promise<void> => {
  const fd = new FormData();

  const drawingConverted = await dataUrlToFile(drawing, "image/png");

  fd.append("file", drawingConverted);

  let response = null;

  response = await axios.post(`/ga/api/drawings/upload_drawing`, fd);
  commit("setUploadedDrawings", response.data.file.filename);

  return response!.data.success;
};

export const fetchDrawing: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = async ({ commit }, drawingFilename: string): Promise<void> => {
  const response = await axios.get(
    `/ga/api/drawings/drawing/${drawingFilename}`
  );
  if (response.data.success) {
    const drawingFound = response.data.drawing;

    commit("setDrawing", drawingFound);
  }
  return response.data.success;
};

export const fetchActualDrawings: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = async ({ commit }, { drawingsFiles }): Promise<void> => {
  await doFetchActualDrawing(commit, drawingsFiles);
};

export const fetchUploadUserUploadedDrawings: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = async ({ commit }, { userName, uploadedDrawings }): Promise<void> => {
  const response = await axios.post(
    `/ga/api/drawings/users_uploaded_drawings`,
    {
      userName,
      uploadedDrawings,
    }
  );

  return response.data.success;
};

export const fetchUserUploadedDrawings: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = async ({ commit }, userName: string): Promise<void> => {
  const response = await axios.get(
    `/ga/api/drawings/user_uploaded_drawings/${userName}`
  );

  if (response.data.success) {
    const userUploadedDrawings = response.data.usersUploadedDrawings;
    commit("setUserUploadedDrawings", userUploadedDrawings);
  }

  return response.data.success;
};

export const fetchResetUserUploadedDrawings: ActionHandler<
  GA.DrawingsState,
  GA.RootState
> = ({ commit }) => {
  commit("setAllUploadedDrawings", []);
};

export const actions: ActionTree<GA.DrawingsState, GA.RootState> = {
  fetchUploadDrawing,
  fetchDrawing,
  fetchActualDrawings,
  fetchUploadUserUploadedDrawings,
  fetchUserUploadedDrawings,
  fetchResetUserUploadedDrawings,
};
