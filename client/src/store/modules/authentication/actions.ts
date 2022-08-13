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
    const loggedInUser = response.data.user;

    console.log(loggedInUser);

    // store the token on local storage
    localStorage.setItem("GA-token", gaToken);
    localStorage.setItem("GA-name", loggedInUser.name ?? "");
    // set the axios defaults
    axios.defaults.headers.common["Authorization"] = gaToken;
    commit("setAuthenticationSucceeded");
    commit("setGaToken", gaToken);
    commit("setUser", loggedInUser);
  }
  return response.data.success;
};

export const fetchSignup: ActionHandler<
  GA.AuthenticationState,
  GA.RootState
> = async ({ commit }, user: GA.UserBase): Promise<void> => {
  commit("setSignupRequest");
  const response = await axios.post("/ga/api/users/signup", user);
  if (response.data.success) {
    commit("setSignupSucceeded");
  }
  return response.data.success;
};

export const fetchLogout: ActionHandler<
  GA.AuthenticationState,
  GA.RootState
> = async ({ commit }): Promise<void> => {
  // delete the token from local storage
  localStorage.removeItem("GA-token");
  localStorage.removeItem("GA-name");

  commit("setGaToken", "");
  commit("setUser", "");
};

export const actions: ActionTree<GA.AuthenticationState, GA.RootState> = {
  fetchLogin,
  fetchSignup,
  fetchLogout,
};
