import {
  iconsCategoriesMock,
  iconCategoriesSortedMock,
} from "../../modules/icons/mock-data/mock";

interface MockIconsState {
  iconsCategories: GA.IconCategoryBase[];
  iconCategoriesSorted: GA.IconCategoryBase[];
}

export const iconsMockState: MockIconsState = {
  iconsCategories: iconsCategoriesMock,
  iconCategoriesSorted: iconCategoriesSortedMock,
};
