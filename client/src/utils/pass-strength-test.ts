import { PASS_POINTS_DISTANCE } from "@/config/consts";

export const testIconPassStrength = (pass: string): number => {
  const n = pass.length;
  let strength = n * 4;

  // check the number of symbol characters
  const numberOfSymbols = pass.split("_").length - 1;
  // check number of lower case letters occurrences
  const numberOfLowerCaseLetters = (pass.match(/[a-z]/g) || []).length;
  // check number of upper case letters occurrences
  const numberOfUpperCaseLetters = (pass.match(/[A-Z]/g) || []).length;

  // check for repetitive sequences
  let repeats = 0;
  const iconsNameAll = pass.split("_");
  const iconsNamesSet = new Set<string>(iconsNameAll);
  for (const iconName of iconsNamesSet) {
    // find the occurences of the icon name in the pass
    const numberOfOccurencesIconName = pass.split(iconName).length - 1;
    // if the icon name appears more than just one time
    // cumulate the number of occurences with the length of the icon name
    if (numberOfOccurencesIconName != 1) {
      repeats += (numberOfOccurencesIconName - 1) * iconName.length;
    }
  }

  // cumulate characters appearances in the strength of the pass
  // decrease from the strength of the pass the repeats
  strength += numberOfSymbols * 6;
  strength += numberOfLowerCaseLetters * 2;
  strength += numberOfUpperCaseLetters * 2;
  strength -= repeats * 2;

  return strength;
};

export const testPassPointsStrength = (passPoints: []): number => {
  const passPointsPairs = Object.values(passPoints);
  const closedPassPoints = new Set();
  for (let i = 0; i < passPointsPairs.length - 1; i++) {
    const currentPassPoint = passPointsPairs[i];
    for (let j = i + 1; j < passPointsPairs.length; j++) {
      const passPointToBeCompared = passPointsPairs[j];

      console.log(currentPassPoint, passPointToBeCompared);

      // compare the percentages relative to the parent
      // if both the left and the top one are really close
      // then add the current pass point to the comparation set
      const horizontalDistance = Math.abs(
        currentPassPoint[0] - passPointToBeCompared[0]
      );
      const verticalDistance = Math.abs(
        currentPassPoint[1] - passPointToBeCompared[1]
      );

      console.log(horizontalDistance);
      console.log(verticalDistance);

      if (
        horizontalDistance <= PASS_POINTS_DISTANCE &&
        verticalDistance <= PASS_POINTS_DISTANCE
      ) {
        closedPassPoints.add(currentPassPoint);
        closedPassPoints.add(passPointToBeCompared);
      }
    }
  }

  console.log(closedPassPoints);

  return closedPassPoints.size;
};

export const testPassPointsDistance = (
  passPoints: any[],
  initialPassPoints: any[]
): boolean => {
  console.log(passPoints, initialPassPoints);
  let validPassPoint = true;
  for (let i = 0; i < passPoints.length; i++) {
    const currentPassPoint = passPoints[i];
    let hasClosedAssosiatedPassPoint = false;
    for (let j = 0; j < initialPassPoints.length; j++) {
      const currentInitialPassPoint = initialPassPoints[j];

      const horizontalDistance = Math.abs(
        currentPassPoint[0] - currentInitialPassPoint[0]
      );
      const verticalDistance = Math.abs(
        currentPassPoint[1] - currentInitialPassPoint[1]
      );

      console.log(horizontalDistance, verticalDistance);

      if (horizontalDistance <= 5 && verticalDistance <= 5) {
        hasClosedAssosiatedPassPoint = true;
      }
    }
    validPassPoint = validPassPoint && hasClosedAssosiatedPassPoint;
    console.log(validPassPoint);
  }
  return validPassPoint;
};
