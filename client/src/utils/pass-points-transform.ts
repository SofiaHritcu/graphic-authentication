const transformPassPointPair = (
  passPointPair: number[],
  last = false
): string => {
  return !last
    ? passPointPair[0]
        .toString()
        .concat("_")
        .concat(passPointPair[1].toString())
        .concat("_")
    : passPointPair[0]
        .toString()
        .concat("_")
        .concat(passPointPair[1].toString());
};

export const transformPassPoints = (
  passPoints: any[],
  imageFileName: string
): string => {
  const passPointsPairsString = passPoints.reduce(
    (acc, passPoint, index, passPointsArr) => {
      return index !== passPointsArr.length - 1
        ? acc.concat(transformPassPointPair(passPoint))
        : acc.concat(transformPassPointPair(passPoint, true));
    },
    ""
  );
  return imageFileName
    .replace(".png", "")
    .concat("_")
    .concat(passPointsPairsString);
};
