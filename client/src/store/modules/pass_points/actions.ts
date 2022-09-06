import { dataUrlToFile } from "@/utils/file-utils";
import axios from "axios";
import { ActionHandler, ActionTree, Commit } from "vuex";

export const doFetchActualPassPointImage = async (
  commit: Commit,
  imageFilename: any
): Promise<void | null> => {
  const response = await axios.get(
    `/ga/api/pass_point/image_actual/${imageFilename}`
  );
  if (response) {
    const actualImageFound = response.data;

    return actualImageFound;
  }
  return null;
};

export const fetchUploadPassPointImage: ActionHandler<
  GA.PassPointsState,
  GA.RootState
> = async ({ commit }, { passPointImage }): Promise<void> => {
  const fd = new FormData();
  fd.append("file", passPointImage);

  let response = null;

  response = await axios.post(`/ga/api/pass_point/upload_image`, fd);
  commit("setUploadedImage", response.data.file.filename);

  return response!.data.success;
};

export const fetchTextRecogn: ActionHandler<
  GA.PassPointsState,
  GA.RootState
> = async ({ commit }, { passPointImageFile }): Promise<void> => {
  const fd = new FormData();
  fd.append("file", passPointImageFile);

  let response = null;

  response = await axios.post(`/ga/api/text_recogn/recogn`, fd);

  if (response.data.success) {
    const { containsText } = response.data;
    commit("setUploadedImageContainsText", containsText);
  }

  return response.data.success;
};

export const fetchActualPassPointImage: ActionHandler<
  GA.PassPointsState,
  GA.RootState
> = async ({ commit }, { passPointImage }): Promise<void> => {
  await doFetchActualPassPointImage(commit, passPointImage);
};

export const fetchUploadUserUploadedPassPointImage: ActionHandler<
  GA.PassPointsState,
  GA.RootState
> = async (
  { commit },
  { userName, uploadedImage, passPoints }
): Promise<void> => {
  const response = await axios.post(
    `/ga/api/pass_point/users_uploaded_pass_points`,
    {
      userName,
      uploadedImage,
      passPoints,
    }
  );

  return response.data.success;
};

export const fetchUserUploadedPassPointImage: ActionHandler<
  GA.PassPointsState,
  GA.RootState
> = async ({ commit }, userName: string): Promise<void> => {
  const response = await axios.get(
    `/ga/api/pass_point/user_uploaded_pass_points/${userName}`
  );

  if (response.data.success) {
    const userUploadedImage = response.data.uploadedImage;
    const userUploadedPassPoints = response.data.uploadedPassPoints;
    commit("setUserUploadedImage", userUploadedImage);
    commit("setUserUploadedPassPoints", userUploadedPassPoints);
  }

  return response.data.success;
};

export const actions: ActionTree<GA.PassPointsState, GA.RootState> = {
  fetchUploadPassPointImage,
  fetchTextRecogn,
  fetchActualPassPointImage,
  fetchUploadUserUploadedPassPointImage,
  fetchUserUploadedPassPointImage,
};
