import { Mutation, MutationTree } from "vuex";

export const setIconsCategories: Mutation<GA.IconsState> = (
  state,
  iconsCategories: GA.IconCategoryBase[]
): void => {
  state.iconsCategories = iconsCategories;
};

export const mutations: MutationTree<GA.IconsState> = {
  setIconsCategories,
};
