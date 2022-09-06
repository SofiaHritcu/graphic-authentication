import { Getter, GetterTree } from "vuex";

export const uploadedImage: Getter<GA.PassPointsState, GA.RootState> = (
  state
): any => state.uploadedImage;

export const uploadedImageContainsText: Getter<
  GA.PassPointsState,
  GA.RootState
> = (state): boolean | undefined => state.uploadedImageContainsText;

export const userUploadedImage: Getter<GA.PassPointsState, GA.RootState> = (
  state
): string => state.userUploadedImage;

export const userUploadedPassPoints: Getter<
  GA.PassPointsState,
  GA.RootState
> = (state): any[] => state.userUploadedPassPoints;

export const getters: GetterTree<GA.PassPointsState, GA.RootState> = {
  uploadedImage,
  uploadedImageContainsText,
  userUploadedImage,
  userUploadedPassPoints,
};
