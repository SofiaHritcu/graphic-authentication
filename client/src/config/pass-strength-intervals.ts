export const ICON_PASS_STRENGTH_INTERVALS = [
  {
    lower: 0,
    upper: 100,
    qualifying: "bad level of security",
    color: "#C62828",
    vColor: "red",
    vOpacity: "darken-3",
  },
  {
    lower: 100,
    upper: 200,
    qualifying: "good enough level of security",
    color: "#FF8F00",
    vColor: "amber",
    vOpacity: "darken-3",
  },
  {
    lower: 200,
    upper: 1000,
    qualifying: "safe pass",
    color: "#2E7D32",
    vColor: "green",
    vOpacity: "darken-3",
  },
];

export const IMAGE_PASS_STRENGTH_INTERVALS = [
  {
    lower: 0,
    upper: 100,
    qualifying: "bad level of security",
    color: "#C62828",
    vColor: "red",
    vOpacity: "darken-3",
  },
  {
    lower: 100,
    upper: 200,
    qualifying: "good enough level of security",
    color: "#FF8F00",
    vColor: "amber",
    vOpacity: "darken-3",
  },
  {
    lower: 200,
    upper: 1000,
    qualifying: "safe pass",
    color: "#2E7D32",
    vColor: "green",
    vOpacity: "darken-3",
  },
];

export const DRAWINGS_PASS_STRENGTH_INTERVALS = [
  {
    lower: 3,
    upper: 6,
    qualifying: "The following drawigs in your IPASS are very similar",
    color: "#C62828",
    vColor: "red",
    vOpacity: "darken-3",
  },
  {
    lower: 1,
    upper: 2,
    qualifying: "The following drawigs in your IPASS are similar",
    color: "#FF8F00",
    vColor: "amber",
    vOpacity: "darken-3",
  },
  {
    lower: 0,
    upper: 1,
    qualifying: "Your IPASS is safe due to the following drawings",
    color: "#2E7D32",
    vColor: "green",
    vOpacity: "darken-3",
  },
];
