import { Mutation, MutationTree } from "vuex";

export const setAuthRequest: Mutation<GA.AuthenticationState> = (
  state
): void => {
  state.status = "loading";
};

export const setSignupRequest: Mutation<GA.AuthenticationState> = (
  state
): void => {
  state.status = "loading";
};

export const setAuthenticationSucceeded: Mutation<GA.AuthenticationState> = (
  state
): void => {
  state.status = "success";
};

export const setSignupSucceeded: Mutation<GA.AuthenticationState> = (
  state
): void => {
  state.status = "success";
};

export const setGaToken: Mutation<GA.AuthenticationState> = (
  state,
  gaToken: string
): void => {
  state.gaToken = gaToken;
};

export const setUser: Mutation<GA.AuthenticationState> = (
  state,
  user: GA.UserBase
): void => {
  state.user = user;
};

export const mutations: MutationTree<GA.AuthenticationState> = {
  setAuthRequest,
  setAuthenticationSucceeded,
  setSignupRequest,
  setSignupSucceeded,
  setGaToken,
  setUser,
};
