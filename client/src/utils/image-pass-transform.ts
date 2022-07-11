const transformImageName = (imageName: string, last = false): string => {
  return !last
    ? imageName.replace(".png", "").concat("_")
    : imageName.replace(".png", "");
};

export const transformImagePass = (imagePass: string[]): string => {
  return imagePass.reduce((acc, imgPass, index, imagePassArr) => {
    return index !== imagePassArr.length - 1
      ? acc.concat(transformImageName(imgPass))
      : acc.concat(transformImageName(imgPass, true));
  }, "");
};
