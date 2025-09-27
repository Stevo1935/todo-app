// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// views
import Home from "../views/Home.vue";
import TodoDetail from "../views/TodoDetail.vue";
import ErrorTest from "../views/ErrorTest.vue";
import NotFound from "../views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todos/:id",
    name: "TodoDetail",
    component: TodoDetail,
    props: true, // ✅ lets you get :id as a prop in the component
  },
  {
    path: "/error-test",
    name: "ErrorTest",
    component: ErrorTest,
  },
  {
    path: "/:pathMatch(.*)*", // ✅ catch-all route
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
