import { ActionHandler, ActionTree, Commit } from "vuex";
import axios from "axios";
import {
  GA_PEOPLE_IMAGE_CATEGORY,
  GA_UPLOADED_IMAGE_CATEGORY,
} from "@/config/consts";

const doFetchPeopleFacesImages = async (commit: Commit): Promise<void> => {
  const response = await axios.get("/ga/api/images/people_faces_images");
  if (response.data.success) {
    const peopleFacesImages = response.data.peopleFacesImages;

    commit("setPeopleFacesImages", peopleFacesImages);
  }
  return response.data.success;
};

const doFetchUploadedImages = async (commit: Commit): Promise<void> => {
  const response = await axios.get("/ga/api/images/uploaded_images");
  if (response.data.success) {
    const uploadedImages = response.data.uploadedImages;

    commit("setUploadedImages", uploadedImages);
  }
  return response.data.success;
};

export const doFetchActualImage = async (
  commit: Commit,
  imageFilename: any,
  bucketName: string
): Promise<void | null> => {
  const response = await axios.get(
    `/ga/api/images/${bucketName}/${imageFilename}`
  );
  if (response) {
    const actualImageFound = response.data;

    return actualImageFound;
  }
  return null;
};

const doFetchActualPeopleFacesImages = async (
  commit: Commit,
  imagesFiles: any[]
): Promise<void> => {
  const actualPeopleFacesImages: never[] = [];
  for (const imageFile of imagesFiles) {
    const actualPeopleFacesImage = await doFetchActualImage(
      commit,
      imageFile.filename,
      "people_faces_images"
    );
    if (actualPeopleFacesImage) {
      actualPeopleFacesImages.push(actualPeopleFacesImage);
    }
  }
  commit("setActualPeopleFacesImages", actualPeopleFacesImages);
};

const doFetchActualUploadedImages = async (
  commit: Commit,
  imagesFiles: any[]
): Promise<void> => {
  const actualUploadedImages: never[] = [];
  for (const imageFile of imagesFiles) {
    const actualUploadedImage = await doFetchActualImage(
      commit,
      imageFile.filename,
      "uploaded_images"
    );
    if (actualUploadedImage) {
      actualUploadedImages.push(actualUploadedImage);
    }
  }
  commit("setActualUploadedImages", actualUploadedImages);
};

export const fetchFaceImagesCategories: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }): Promise<void> => {
  const response = await axios.get("/ga/api/images/images_categories");
  if (response.data.success) {
    const imagesCategories = response.data.imagesCategories;

    commit("setImagesCategories", imagesCategories);
  }
  return response.data.success;
};

export const fetchUploadImage: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, { image, bucketName }): Promise<void> => {
  const fd = new FormData();
  fd.append("file", image);

  let response = null;

  switch (bucketName) {
    case "uploaded_images":
      response = await axios.post(`/ga/api/images/upload_uploaded`, fd);
      commit("setUploadedFaceImages", response.data.file.filename);
  }

  return response!.data.success;
};

export const fetchPeopleFacesImage: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, peopleFacesImageFilename: string): Promise<void> => {
  const response = await axios.get(
    `/ga/api/images/people_faces_image/${peopleFacesImageFilename}`
  );
  if (response.data.success) {
    const peopleFacesImageFound = response.data.peopleFacesImage;

    commit("setFoundPeopleFacesImage", peopleFacesImageFound);
  }
  return response.data.success;
};

export const fetchImagesByCategory: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, imagesCategory: any): Promise<void> => {
  switch (imagesCategory) {
    case GA_UPLOADED_IMAGE_CATEGORY:
      await doFetchUploadedImages(commit);
      break;
    case GA_PEOPLE_IMAGE_CATEGORY:
      await doFetchPeopleFacesImages(commit);
      break;
  }
};

export const fetchActualImagesByCategory: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, { faceImagesCategory, imagesFiles }): Promise<void> => {
  if (faceImagesCategory === "people") {
    await doFetchActualPeopleFacesImages(commit, imagesFiles);
  }
};

export const fetchUploadUserUploadedImages: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, { userName, uploadedImages }): Promise<void> => {
  const response = await axios.post(`/ga/api/images/users_uploaded_images`, {
    userName,
    uploadedImages,
  });
  return response.data.success;
};

export const fetchUserUploadedImages: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }, userName: string): Promise<void> => {
  const response = await axios.get(
    `/ga/api/images/user_uploaded_images/${userName}`
  );

  if (response.data.success) {
    const userUploadedImages = response.data.uploadedImages;
    commit("setUserUploadedImages", userUploadedImages);
  }

  return response.data.success;
};

export const fetchBufferPeopleFacesImages: ActionHandler<
  GA.ImagesState,
  GA.RootState
> = async ({ commit }): Promise<void> => {
  const response = await axios.get(`/ga/api/images/people_faces_images/buffer`);
  if (response.data.success) {
    const peopleFacesImagesBufferResponse =
      response.data.peopleFacesImagesBuffer;

    commit(
      "setBufferPeopleFacesImages",
      peopleFacesImagesBufferResponse[0].bufferImagesFilenames
    );
  }
  return response.data.success;
};

export const actions: ActionTree<GA.ImagesState, GA.RootState> = {
  fetchFaceImagesCategories,
  fetchUploadImage,
  fetchPeopleFacesImage,
  fetchImagesByCategory,
  fetchActualImagesByCategory,
  fetchUploadUserUploadedImages,
  fetchUserUploadedImages,
  fetchBufferPeopleFacesImages,
};
