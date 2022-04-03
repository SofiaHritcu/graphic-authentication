import { iconsCategoriesMock } from "./mock-data/mock";
import { mutations } from "@/store/modules/icons/mutations";

const iconsState: GA.IconsState = {
  iconsCategories: [],
};

describe("mutations of module icons", () => {
  describe("setIconsCategories", () => {
    it("should change the state to the specified iconsCategories", () => {
      mutations.setIconsCategories(iconsState, iconsCategoriesMock);
      expect(iconsState.iconsCategories).toBe(iconsCategoriesMock);
    });
  });
});
