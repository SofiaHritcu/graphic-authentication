declare module GA {
  // general use interfaces
  export interface RootState {
    version: string;
  }

  export interface ImageFile {
    _id: string;
    filename: string;
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

  export interface ImagesState {
    imagesCategories: ImageCategoryBase[];
    peopleFacesImages: any[];
    foundPeopleFacesImage: any;
    foundActualPeopleFacesImage: any;
    actualPeopleFacesImage: any[];
    uploadedFaceImages: any[];
    uploadedImages: string[];
    actualUploadedImages: any[];
    userUploadedImages: string[];
    bufferPeopleFacesImages: string[];
  }

  export interface DrawingsState {
    drawings: any[];
    foundDrawing: any;
    foundActualDrawing: any;
    actualDrawing: any[];
    uploadedDrawings: string[];
    actualUploadedDrawings: any[];
    userUploadedDrawings: string[];
  }

  export interface DrawingsSimilarityState {
    similarityLevel: any;
    sameSimilarityDrawings: string[];
  }

  export interface BufferDrawingsState {
    bufferDrawings: string[];
  }

  export interface PassPointsState {
    uploadedImage: any;
    uploadedImageContainsText?: boolean;
    userUploadedImage: string;
    userUploadedPassPoints: any[];
  }

  // base entities interfaces
  export interface UserBase {
    userName: string;
    name?: string;
    email?: string;
    password: string;
  }

  interface Category {
    _id: string;
    category: string;
  }
  export interface IconCategoryBase extends Category {
    icons: string[];
  }

  // TO DO
  export interface ImageCategoryBase extends Category {
    label?: string;
  }

  export interface MockStoreState extends GA.RootState {
    version: string;
    icons: IconsState;
    authentication: AuthenticationState;
  }
}
