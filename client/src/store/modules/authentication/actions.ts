import { ActionHandler, ActionTree } from "vuex";
import axios from "axios";

export const fetchLogin: ActionHandler<
  GA.AuthenticationState,
  GA.RootState
> = async ({ commit }, user: GA.UserBase): Promise<void> => {
  commit("setAuthRequest");
  const response = await axios.post("/ga/api/users/login", user);
  if (response.data.success) {
    const gaToken = response.data.token;
    const user = response.data.user;

    // store the token on local storage
    localStorage.setItem("GA-token", gaToken);
    // set the axios defaults
    axios.defaults.headers.common["Authorization"] = gaToken;
    commit("setAuthenticationSucceeded");
    commit("setGaToken", gaToken);
    commit("setUser", user);
  }
  return response.data.success;
};

export const fetchSignup: ActionHandler<GA.AuthenticationState, GA.RootState> = async (
  { commit },
  user: GA.UserBase
): Promise<void> => {
  commit("setSignupRequest");
  const response = await axios.post("/ga/api/users/signup", user);
  if (response.data.success) {
    commit("setSignupSucceeded");
  }
  return response.data.success;
};

export const actions: ActionTree<GA.AuthenticationState, GA.RootState> = {
  fetchLogin,
  fetchSignup,
};
