import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tabbar from "../components/tabbar";
// 先识别所有的views/文件夹name/*.vue文件
// 这里限制性很高，只有路径为/views/文件夹name/*.vue，的文件才能背识别
const modules = import.meta.glob("../views/*/*.vue");
const loadComponent = (component: string) =>
  modules[`../views/${component}.vue`];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: Tabbar,
    children: [
      {
        path: "/home",
        component: loadComponent("home/index"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/label",
        component: loadComponent("label/index"),
        meta: {
          title: "标签",
        },
      },
      {
        path: "/message",
        component: loadComponent("message/index"),
        meta: {
          title: "留言",
        },
      },
      {
        path: "/myself",
        component: loadComponent("myself/index"),
        meta: {
          title: "关于我",
        },
      },
    ],
  },
  {
    path: "/article/detail",
    component: loadComponent("article/detail"),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
