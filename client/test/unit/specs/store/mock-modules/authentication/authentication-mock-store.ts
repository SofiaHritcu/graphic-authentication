import { authenticationMockState } from "./authentication-mock-state";

const authenticationMock: any = {
  namespaced: true,
  state: authenticationMockState,
  actions: {
    fetchLogin: jest.fn(() => Promise.resolve(() => ({status: '200'}))),
    fetchSignup: jest.fn(() => Promise.resolve()),
  },
  mutations: {
    setAuthRequest: jest.fn(),
    setSignupRequest: jest.fn(),
    setAuthenticationSucceeded: jest.fn(),
    setSignupSucceeded: jest.fn(),
    setGaToken: jest.fn(),
    setUser: jest.fn(),
  },
};

authenticationMock.getters = {
  isLoggedIn: () => authenticationMock.state.gaToken !== "",
  authState: () => authenticationMock.state.status,
  user: () => authenticationMock.state.user,
};

export { authenticationMock };
