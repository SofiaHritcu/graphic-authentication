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
} from "@/config/consts";

const WrapperView = () => import("@/views/wrapper-view.vue");
const LandingView = () => import("@/views/landing-view.vue");
const SignUpView = () => import("@/views/signup/signup-view.vue");
const SignupIconView = () => import("@/views/signup/signup-icon-view.vue");
const SignupFaceRecognView = () =>
  import("@/views/signup/signup-face-recogn-view/signup-face-recogn-view.vue");
const UploadFaceView = () =>
  import("@/views/signup/signup-face-recogn-view/upload-face-image.vue");
const LoginView = () => import("@/views/login/login-view.vue");
const LoginIconView = () => import("@/views/login/login-icon-view.vue");
const LoginFaceRecognView = () =>
  import("@/views/login/login-face-recogn-view.vue");
const LearnMoreView = () => import("@/views/learn-more-view.vue");

Vue.use(VueRouter);

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
        path: "/ga/learn",
        name: GA_LEARN_MORE_ROUTE_NAME,
        component: LearnMoreView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
