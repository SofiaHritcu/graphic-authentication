import { ActionHandler, ActionTree } from 'vuex';
import axios from 'axios';

export const fetchIconsCategories: ActionHandler<GA.IconsState, GA.RootState> = async (
  { commit },
): Promise<void> => {
  const response = await axios.get('http://localhost:5000/ga/api/icons/icons_categories');
  if(response.data.success) {
    const iconsCategories = response.data.iconsCategories;

    commit('setIconsCategories', iconsCategories);
  }
  return response.data.success;
};

export const actions: ActionTree<GA.IconsState, GA.RootState> = {
  fetchIconsCategories,
};