import {
  gaTokenMock,
  userMock,
  statusMock,
} from "../../modules/authentication/mock-data/mock";

interface MockAuthenticationState {
  gaToken: string;
  user: {
    userName: string;
    password: string;
  };
  status: string;
}

export const authenticationMockState: MockAuthenticationState = {
  gaToken: gaTokenMock,
  user: userMock,
  status: statusMock,
};
