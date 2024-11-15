/**
 * @file router/modules/main.ts
 * @description 主路由模块
 * @since Beta v0.6.3
 */

const mainRoutes = [
  {
    path: "/",
    name: "首页",
    component: async () => await import("../../pages/common/Home.vue"),
  },
  {
    path: "/announcements",
    name: "公告",
    component: async () => await import("../../pages/common/Announcements.vue"),
  },
  {
    path: "/news/:gid/:type?",
    name: "咨讯",
    component: async () => await import("../../pages/common/News.vue"),
  },
  {
    path: "/posts/:gid?/:forum?",
    name: "酒馆",
    component: async () => await import("../../pages/common/PostForum.vue"),
  },
  {
    path: "/posts/:gid?/:topic",
    name: "话题",
    component: async () => await import("../../pages/common/PostTopic.vue"),
  },
  {
    path: "/achievements/:app?",
    name: "成就",
    component: async () => await import("../../pages/common/Achievements.vue"),
  },
  {
    path: "/collection",
    name: "收藏",
    component: async () => await import("../../pages/common/PostCollect.vue"),
  },
  {
    path: "/test",
    name: "测试页",
    component: async () => await import("../../pages/common/Test.vue"),
  },
  {
    path: "/config",
    name: "设置",
    component: async () => await import("../../pages/common/Config.vue"),
  },
];

export default mainRoutes;
