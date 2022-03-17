import { Getter, GetterTree } from 'vuex';

export const isLoggedIn: Getter<GA.AuthenticationState, GA.RootState> = (state): boolean =>
  state.gaToken != '';

export const authState: Getter<GA.AuthenticationState, GA.RootState> = (state): string =>
  state.status;

export const user: Getter<GA.AuthenticationState, GA.RootState> = (state): GA.UserBase =>
  state.user;

export const getters: GetterTree<GA.AuthenticationState, GA.RootState> = {
    isLoggedIn,
    authState,
    user,
};
