import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  GA_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_LEARN_MORE_ROUTE_NAME,
  GA_LOGIN_ICON_ROUTE_NAME,
  GA_SIGNUP_ICON_ROUTE_NAME,
  GA_LOGIN_FACE_RECOGN_ROUTE_NAME,
  GA_SIGNUP_FACE_RECOGN_ROUTE_NAME,
  GA_UPLOAD_FACE_ROUTE_NAME,
  GA_SIGNUP_DRAWING_ROUTE_NAME,
  GA_LOGIN_DRAWING_ROUTE_NAME,
  GA_LOGGED_IN_ROUTE_NAME,
  GA_LOGGED_WELCOME_ROUTE_NAME,
  GA_SIGNUP_PASS_POINTS_ROUTE_NAME,
  GA_LOGIN_PASS_POINTS_ROUTE_NAME,
} from "@/config/consts";

// main views
const WrapperView = () => import("@/views/utilities/wrapper-view.vue");
const LandingView = () => import("@/views/landing/landing-view.vue");
const LoggedInLandingView = () =>
  import("@/views/landing/logged-in-landing-view.vue");
const LearnMoreView = () => import("@/views/utilities/learn-more-view.vue");
const LoggedInView = () => import("@/views/logged/logged-in-view.vue");

// signup views
const SignUpView = () => import("@/views/signup/signup-view.vue");
const SignupIconView = () =>
  import("@/views/signup/signup-icon/signup-icon-view.vue");
const SignupFaceRecognView = () =>
  import("@/views/signup/signup-image-recogn/signup-face-recogn-view.vue");
const SignupDrawingView = () =>
  import("@/views/signup/signup-drawing/signup-drawing-view.vue");
const UploadFaceView = () =>
  import("@/components/ui/upload-image/upload-face-image.vue");
const SignupPassPointsView = () =>
  import("@/views/signup/signup-pass-points/signup-pass-points-view.vue");

// login views
const LoginView = () => import("@/views/login/login-view.vue");
const LoginIconView = () =>
  import("@/views/login/login-icon/login-icon-view.vue");
const LoginFaceRecognView = () =>
  import("@/views/login/login-image-recogn/login-face-recogn-view.vue");
const LoginDrawingView = () =>
  import("@/views/login/login-drawing/login-drawing-view.vue");
const LoginPassPointsView = () =>
  import("@/views/login/login-pass-points/login-pass-points-view.vue");

// not found
const NotFoundView = () => import("@/views/utilities/not-found-view.vue");

Vue.use(VueRouter);

const isLoggedIn = () => {
  return localStorage.getItem("GA-token") !== null;
};

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: GA_ROUTE_NAME,
    component: WrapperView,
    redirect: "/ga/welcome",
    meta: {
      title: "IPASS",
    },
    children: [
      {
        path: "/ga/welcome",
        name: GA_WELCOME_ROUTE_NAME,
        component: LandingView,
      },
      {
        path: "/ga/logged-welcome",
        name: GA_LOGGED_WELCOME_ROUTE_NAME,
        component: LoggedInLandingView,
        beforeEnter: (to, from, next) => {
          if (!isLoggedIn()) {
            // if the user is not logged in yet
            // redirect to login view
            next({ name: GA_LOGIN_ROUTE_NAME });
          } else {
            // otherwise proceed to the guarded view
            next();
          }
        },
      },
      // signup routes
      {
        path: "/ga/signup",
        name: GA_SIGNUP_ROUTE_NAME,
        component: SignUpView,
      },
      {
        path: "/ga/signup/icon",
        name: GA_SIGNUP_ICON_ROUTE_NAME,
        component: SignupIconView,
      },
      {
        path: "/ga/signup/face-recogn",
        name: GA_SIGNUP_FACE_RECOGN_ROUTE_NAME,
        component: SignupFaceRecognView,
      },
      {
        path: "/ga/signup/face-recogn/upload-face",
        name: GA_UPLOAD_FACE_ROUTE_NAME,
        component: UploadFaceView,
      },
      {
        path: "/ga/signup/drawing",
        name: GA_SIGNUP_DRAWING_ROUTE_NAME,
        component: SignupDrawingView,
      },
      {
        path: "/ga/signup/pass-points",
        name: GA_SIGNUP_PASS_POINTS_ROUTE_NAME,
        component: SignupPassPointsView,
      },
      // login routes
      {
        path: "/ga/login",
        name: GA_LOGIN_ROUTE_NAME,
        component: LoginView,
      },
      {
        path: "/ga/login/icon",
        name: GA_LOGIN_ICON_ROUTE_NAME,
        component: LoginIconView,
      },
      {
        path: "/ga/login/face_recogn",
        name: GA_LOGIN_FACE_RECOGN_ROUTE_NAME,
        component: LoginFaceRecognView,
      },
      {
        path: "/ga/login/drawing",
        name: GA_LOGIN_DRAWING_ROUTE_NAME,
        component: LoginDrawingView,
      },
      {
        path: "/ga/login/pass_points",
        name: GA_LOGIN_PASS_POINTS_ROUTE_NAME,
        component: LoginPassPointsView,
      },
      // other routes
      {
        path: "/ga/learn",
        name: GA_LEARN_MORE_ROUTE_NAME,
        component: LearnMoreView,
      },
      {
        path: "/ga/logged",
        name: GA_LOGGED_IN_ROUTE_NAME,
        component: LoggedInView,
        beforeEnter: (to, from, next) => {
          if (!isLoggedIn()) {
            // if the user is not logged in yet
            // redirect to login view
            next({ name: GA_LOGIN_ROUTE_NAME });
          } else {
            // otherwise proceed to the guarded view
            next();
          }
        },
      },
    ],
  },
  // not found
  {
    path: "*",
    component: NotFoundView,
  },
  // home
  {
    path: "/",
    name: GA_ROUTE_NAME,
    component: WrapperView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
