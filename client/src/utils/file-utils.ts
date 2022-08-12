import { randomFileName } from "./random-file-names";

export const urlToFile = async (
  url: string,
  filename: string,
  mimeType: string
) => {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
};

export const dataUrlToFile = async (dataUrl: any, mimeType: any) => {
  mimeType = mimeType || (dataUrl.match(/^data:([^;]+);/) || "")[1];
  const randomlyGeneratedFileName = randomFileName("png");
  const res = await fetch(dataUrl);
  const buf = await res.arrayBuffer();
  return new File([buf], randomlyGeneratedFileName, { type: mimeType });
};
