import { getters } from "@/store/modules/icons/getters";
import { iconsCategoriesMock, iconCategoriesSortedMock } from "./mock-data/mock";

const rootState: GA.RootState = {
  version: "1.1.1",
};

const iconsState: GA.IconsState = {
  iconsCategories: iconsCategoriesMock,
};

describe("getters of module icons", () => {
  describe("iconsCategories", () => {
    it("should get the iconsCategories", () => {
      const result = getters.iconsCategories(iconsState, {}, rootState, {});
      expect(result).toEqual(iconsCategoriesMock);
    });
  });
  describe("iconCategoriesSorted", () => {
    it("should get the iconsCategories sorted by the value", () => {
      const result = getters.iconCategoriesSorted(
        iconsState,
        {},
        rootState,
        {}
      );
      expect(result).toEqual(iconCategoriesSortedMock);
    });
  });
});
