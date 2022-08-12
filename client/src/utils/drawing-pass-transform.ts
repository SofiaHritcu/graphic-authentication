const transformDrawingName = (drawingName: string, last = false): string => {
  return !last
    ? drawingName.replace(".png", "").concat("_")
    : drawingName.replace(".png", "");
};

export const transformDrawingPass = (
  drawingPass: string[],
  allInUserUploadedDrawings: boolean,
  userUploadedDrawings: string[]
): string => {
  if (allInUserUploadedDrawings) {
    return userUploadedDrawings.reduce((acc, drwPass, index, drwPassArr) => {
      return index !== drwPassArr.length - 1
        ? acc.concat(transformDrawingName(drwPass))
        : acc.concat(transformDrawingName(drwPass, true));
    }, "");
  }

  return drawingPass.reduce((acc, drwPass, index, drwPassArr) => {
    return index !== drwPassArr.length - 1
      ? acc.concat(transformDrawingName(drwPass))
      : acc.concat(transformDrawingName(drwPass, true));
  }, "");
};
