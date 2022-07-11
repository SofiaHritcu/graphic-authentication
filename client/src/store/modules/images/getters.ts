import { getFaceImagesCategoriesWithLabels } from "@/utils/processing";
import { Getter, GetterTree } from "vuex";

export const imagesCategories: Getter<GA.ImagesState, GA.RootState> = (
  state
): GA.ImageCategoryBase[] =>
  getFaceImagesCategoriesWithLabels(state.imagesCategories)
    .faceImagesWithLabels;

export const peopleFacesImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): any[] => state.peopleFacesImages;

export const foundPeopleFacesImage: Getter<GA.ImagesState, GA.RootState> = (
  state
): any => state.foundPeopleFacesImage;

export const foundActualPeopleFacesImage: Getter<
  GA.ImagesState,
  GA.RootState
> = (state): any => state.foundActualPeopleFacesImage;

export const actualPeopleFacesImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): any => state.actualPeopleFacesImage;

export const uploadedFaceImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): string[] => state.uploadedFaceImages;

export const uploadedImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): any[] => state.uploadedImages;

export const actualUploadedImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): any[] => state.actualUploadedImages;

export const userUploadedImages: Getter<GA.ImagesState, GA.RootState> = (
  state
): string[] => state.userUploadedImages;

export const getters: GetterTree<GA.ImagesState, GA.RootState> = {
  imagesCategories,
  peopleFacesImages,
  foundPeopleFacesImage,
  foundActualPeopleFacesImage,
  actualPeopleFacesImages,
  uploadedFaceImages,
  uploadedImages,
  actualUploadedImages,
  userUploadedImages,
};
