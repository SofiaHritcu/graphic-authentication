declare module GA {
  // general use interfaces
  export interface RootState {
    version: string;
  }

  // store modules state interfaces
  export interface AuthenticationState {
    gaToken: string;
    user: GA.UserBase;
    status: string;
  }

  export interface IconsState {
    iconsCategories: IconCategoryBase[];
  }

  // base entities interfaces
  export interface UserBase {
    userName: string;
    name?: string;
    email?: string;
    password: string;
    confirmPassword?: string;
  }

  export interface IconCategoryBase {
    _id: string;
    category: string;
    icons: string[];
  }
}
