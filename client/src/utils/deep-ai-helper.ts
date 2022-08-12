import { DEEP_AI_API_KEY, DEEP_AI_API_URL } from "@/config/deep-ai-config";
import {
  DEEP_AI_API_KEY_FILED,
  DEEP_AI_FIRST_IMAGE_FIELD,
  DEEP_AI_SECOND_IMAGE_FIELD,
} from "@/config/deep-ai-request-consts";
import axios from "axios";
import { urlToFile } from "./file-utils";
import { randomFileName } from "./random-file-names";

const convertURLToFileDeepAI = async (url: string, mimeType: string) => {
  const toBeConvertedFileName = randomFileName("png");
  return await urlToFile(url, toBeConvertedFileName, mimeType);
};

export const fetcHDeepAI = async (firstURL: string, secondURL: string) => {
  //step 1. convert URLs to actual files object
  const firstDrawingToBeCompared = await convertURLToFileDeepAI(
    firstURL,
    "img/png"
  );

  const secondDrawingToBeCompared = await convertURLToFileDeepAI(
    secondURL,
    "img/png"
  );

  // step 2. prepare form data for api's expected format
  const fd = new FormData();
  fd.append(DEEP_AI_FIRST_IMAGE_FIELD, firstDrawingToBeCompared);
  fd.append(DEEP_AI_SECOND_IMAGE_FIELD, secondDrawingToBeCompared);

  const res = await axios.post(DEEP_AI_API_URL, fd, {
    headers: { [DEEP_AI_API_KEY_FILED]: DEEP_AI_API_KEY },
  });

  return res.data.output.distance;
};
