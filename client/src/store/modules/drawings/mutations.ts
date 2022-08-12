import { Mutation, MutationTree } from "vuex";

export const setDrawings: Mutation<GA.DrawingsState> = (
  state,
  drawings: any[]
): void => {
  state.drawings = drawings;
};

export const setFoundDrawing: Mutation<GA.DrawingsState> = (
  state,
  foundDrawing: any
): void => {
  state.foundDrawing = foundDrawing;
};

export const setFoundActualDrawing: Mutation<GA.DrawingsState> = (
  state,
  foundActualDrawing: any
): void => {
  state.foundActualDrawing = foundActualDrawing;
};

export const setActualDrawing: Mutation<GA.DrawingsState> = (
  state,
  actualDrawing: any[]
): void => {
  state.actualDrawing = actualDrawing;
};

export const setUploadedDrawings: Mutation<GA.DrawingsState> = (
  state,
  uploadedDrawingFileName: string
): void => {
  const updatedUploadedDrawings = [...state.uploadedDrawings];
  updatedUploadedDrawings.push(uploadedDrawingFileName);
  state.uploadedDrawings = updatedUploadedDrawings;
};

export const setActualUploadedDrawings: Mutation<GA.DrawingsState> = (
  state,
  actualUploadedDrawings: any[]
): void => {
  state.actualUploadedDrawings = actualUploadedDrawings;
};

export const setAllUploadedDrawings: Mutation<GA.DrawingsState> = (
  state,
  uploadedDrawings: any[]
): void => {
  state.uploadedDrawings = uploadedDrawings;
};

export const setUserUploadedDrawings: Mutation<GA.DrawingsState> = (
  state,
  userUploadedDrawings: string[]
): void => {
  state.userUploadedDrawings = userUploadedDrawings;
};

export const mutations: MutationTree<GA.DrawingsState> = {
  setDrawings,
  setFoundDrawing,
  setFoundActualDrawing,
  setActualDrawing,
  setActualUploadedDrawings,
  setUploadedDrawings,
  setUserUploadedDrawings,
  setAllUploadedDrawings,
};
