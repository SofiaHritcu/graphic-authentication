import { iconsMockState } from "./icons-mock-state";

const iconsMock: any = {
  namespaced: true,
  state: iconsMockState,
  actions: {
    fetchIconsCategories: jest.fn(() => Promise.resolve(() => ({data: []}))),
  },
  mutations: {
    setIconsCategories: jest.fn(),
  },
};

iconsMock.getters = {
  iconsCategories: () => iconsMock.state.iconsCategories,
};

export { iconsMock };
