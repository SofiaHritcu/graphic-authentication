import { Mutation, MutationTree } from "vuex";

export const setUploadedImage: Mutation<GA.PassPointsState> = (
  state,
  uploadedImage: any
): void => {
  state.uploadedImage = uploadedImage;
};

export const setUploadedImageContainsText: Mutation<GA.PassPointsState> = (
  state,
  uploadedImageContainsText: boolean
): void => {
  state.uploadedImageContainsText = uploadedImageContainsText;
};

export const setUserUploadedImage: Mutation<GA.PassPointsState> = (
  state,
  userUploadedImage: string
): void => {
  state.userUploadedImage = userUploadedImage;
};

export const setUserUploadedPassPoints: Mutation<GA.PassPointsState> = (
  state,
  userUploadedPassPoints: any[]
): void => {
  state.userUploadedPassPoints = userUploadedPassPoints;
};

export const mutations: MutationTree<GA.PassPointsState> = {
  setUploadedImage,
  setUploadedImageContainsText,
  setUserUploadedImage,
  setUserUploadedPassPoints,
};
