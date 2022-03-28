import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
  GA_ROUTE_NAME,
  GA_WELCOME_ROUTE_NAME,
  GA_SIGNUP_ROUTE_NAME,
  GA_LOGIN_ROUTE_NAME,
  GA_LEARN_MORE_ROUTE_NAME,
  GA_LOGIN_ICON_ROUTE_NAME,
} from "@/config/consts";

const WrapperView = () => import("@/views/wrapper-view.vue");
const LandingView = () => import("@/views/landing-view.vue");
const SignUpView = () => import("@/views/signup-view.vue");
const LoginView = () => import("@/views/login/login-view.vue");
const LoginIconView = () => import("@/views/login/login-icon-view.vue");
const LearnMoreView = () => import("@/views/learn-more-view.vue");

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: GA_ROUTE_NAME,
    component: WrapperView,
    redirect: "/ga/welcome",
    children: [
      {
        path: "/ga/welcome",
        name: GA_WELCOME_ROUTE_NAME,
        component: LandingView,
      },
      {
        path: "/ga/signup",
        name: GA_SIGNUP_ROUTE_NAME,
        component: SignUpView,
      },
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
