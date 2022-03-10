import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { GA_ROUTE_NAME } from "@/config/consts";

const WrapperView = () => import('@/views/wrapper-view.vue');

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/ga",
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
