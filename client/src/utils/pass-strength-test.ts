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
