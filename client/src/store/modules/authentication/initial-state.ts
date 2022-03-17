export const initialState: GA.AuthenticationState = {
  gaToken: localStorage.getItem('GA-token') || '',
  user: {
    userName: '',
    password: '',
  },
  status: '',
};
