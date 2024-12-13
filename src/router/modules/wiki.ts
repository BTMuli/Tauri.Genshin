/**
 * @file router/modules/wiki.ts
 * @description wiki 路由模块
 * @since Beta v0.5.3
 */
import type { RouteRecordRaw } from "vue-router";

const wikiRoutes = (<const>[
  {
    path: "/wiki/abyss",
    name: "深渊数据库",
    component: async () => await import("@/pages/WIKI/Abyss.vue"),
  },
  {
    path: "/wiki/character/:id",
    name: "角色图鉴",
    component: async () => await import("@/pages/WIKI/Character.vue"),
  },
  {
    path: "/wiki/nameCard",
    name: "名片图鉴",
    component: async () => await import("@/pages/WIKI/NameCard.vue"),
  },
  {
    path: "/wiki/material",
    name: "材料图鉴",
    component: async () => await import("@/pages/WIKI/Material.vue"),
  },
  {
    path: "/wiki/weapon/:id",
    name: "武器图鉴",
    component: async () => await import("@/pages/WIKI/Weapon.vue"),
  },
]) satisfies Array<RouteRecordRaw>;

export default wikiRoutes;
