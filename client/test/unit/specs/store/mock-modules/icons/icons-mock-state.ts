import { iconsCategoriesMock } from "../../modules/icons/mock-data/mock";

interface MockIconsState {
  iconsCategories: GA.IconCategoryBase[];
}

export const iconsMockState: MockIconsState = {
  iconsCategories: iconsCategoriesMock,
};
