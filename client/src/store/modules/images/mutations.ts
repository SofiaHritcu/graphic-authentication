import { Mutation, MutationTree } from "vuex";

export const setImagesCategories: Mutation<GA.ImagesState> = (
  state,
  imagesCategories: GA.ImageCategoryBase[]
): void => {
  state.imagesCategories = imagesCategories;
};

export const setPeopleFacesImages: Mutation<GA.ImagesState> = (
  state,
  peopleFacesImages: any[]
): void => {
  state.peopleFacesImages = peopleFacesImages;
};

export const setFoundPeopleFacesImage: Mutation<GA.ImagesState> = (
  state,
  foundPeopleFacesImage: any
): void => {
  state.foundPeopleFacesImage = foundPeopleFacesImage;
};

export const setFoundActualPeopleFacesImage: Mutation<GA.ImagesState> = (
  state,
  foundActualPeopleFacesImage: any
): void => {
  state.foundActualPeopleFacesImage = foundActualPeopleFacesImage;
};

export const setActualPeopleFacesImages: Mutation<GA.ImagesState> = (
  state,
  actualPeopleFacesImage: any[]
): void => {
  state.actualPeopleFacesImage = actualPeopleFacesImage;
};

export const setUploadedFaceImages: Mutation<GA.ImagesState> = (
  state,
  uploadedFaceImageFileName: string
): void => {
  const updatedUploadedFaceImages = [...state.uploadedFaceImages];
  updatedUploadedFaceImages.push(uploadedFaceImageFileName);
  state.uploadedFaceImages = updatedUploadedFaceImages;
};

export const setActualUploadedImages: Mutation<GA.ImagesState> = (
  state,
  actualUploadedImages: any[]
): void => {
  state.actualUploadedImages = actualUploadedImages;
};

export const setUploadedImages: Mutation<GA.ImagesState> = (
  state,
  uploadedImages: any[]
): void => {
  state.uploadedImages = uploadedImages;
};

export const setUserUploadedImages: Mutation<GA.ImagesState> = (
  state,
  userUploadedImages: string[]
): void => {
  state.userUploadedImages = userUploadedImages;
};

export const setBufferPeopleFacesImages: Mutation<GA.ImagesState> = (
  state,
  bufferPeopleFacesImages: string[]
): void => {
  state.bufferPeopleFacesImages = bufferPeopleFacesImages;
};

export const mutations: MutationTree<GA.ImagesState> = {
  setPeopleFacesImages,
  setFoundPeopleFacesImage,
  setFoundActualPeopleFacesImage,
  setActualPeopleFacesImages,
  setUploadedFaceImages,
  setActualUploadedImages,
  setUploadedImages,
  setImagesCategories,
  setUserUploadedImages,
  setBufferPeopleFacesImages,
};
