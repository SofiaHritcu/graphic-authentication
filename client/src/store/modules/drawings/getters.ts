import { Getter, GetterTree } from "vuex";

export const drawings: Getter<GA.DrawingsState, GA.RootState> = (
  state
): any[] => state.drawings;

export const foundDrawing: Getter<GA.DrawingsState, GA.RootState> = (
  state
): any => state.foundDrawing;

export const foundActualDrawing: Getter<GA.DrawingsState, GA.RootState> = (
  state
): any => state.foundActualDrawing;

export const uploadedDrawings: Getter<GA.DrawingsState, GA.RootState> = (
  state
): string[] => state.uploadedDrawings;

export const actualUploadedDrawings: Getter<GA.DrawingsState, GA.RootState> = (
  state
): any[] => state.actualUploadedDrawings;

export const userUploadedDrawings: Getter<GA.DrawingsState, GA.RootState> = (
  state
): string[] => state.userUploadedDrawings;

export const getters: GetterTree<GA.DrawingsState, GA.RootState> = {
  drawings,
  foundDrawing,
  foundActualDrawing,
  uploadedDrawings,
  actualUploadedDrawings,
  userUploadedDrawings,
};
