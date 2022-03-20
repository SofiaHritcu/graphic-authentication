import { SORT_ORDER } from '@/config/sort-config';
import { sortByFieldName } from '@/utils/sort-helper';
import { Getter, GetterTree } from 'vuex';

export const iconsCategories: Getter<GA.IconsState, GA.RootState> = (state): GA.IconCategoryBase[] =>
  state.iconsCategories;

export const iconCategoriesSorted: Getter<GA.IconsState, GA.RootState> = (state): GA.IconCategoryBase[] =>
  sortByFieldName([...state.iconsCategories], 'category', SORT_ORDER.ASCENDING);

export const getters: GetterTree<GA.IconsState, GA.RootState> = {
    iconsCategories,
    iconCategoriesSorted,
};
