import {
  testIconPassStrength,
  testPassPointsStrength,
} from "@/utils/pass-strength-test";
import {
  ICON_PASS_STRENGTH_INTERVALS,
  PASS_POINTS_STRENGTH_INTERVALS,
} from "@/config/pass-strength-intervals";

export const getIconPassStrengthInterval = (pass: string): any => {
  const iconPassStrength = testIconPassStrength(pass);
  const strengthInterval = ICON_PASS_STRENGTH_INTERVALS.find(
    (interval) =>
      interval.lower < iconPassStrength && iconPassStrength <= interval.upper
  )!;
  return strengthInterval;
};

export const getImagePassStrengthInterval = (pass: string): any => {
  const iconPassStrength = testIconPassStrength(pass);
  const strengthInterval = ICON_PASS_STRENGTH_INTERVALS.find(
    (interval) =>
      interval.lower < iconPassStrength && iconPassStrength <= interval.upper
  )!;
  return strengthInterval;
};

export const getPassPointsStrengthInterval = (passPoints: any): any => {
  const passPointsStrength = testPassPointsStrength(passPoints);
  const strengthInterval = PASS_POINTS_STRENGTH_INTERVALS.find(
    (interval) =>
      interval.lower <= passPointsStrength &&
      passPointsStrength < interval.upper
  )!;
  return strengthInterval;
};
