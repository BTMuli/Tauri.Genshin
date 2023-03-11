/**
 * @file store modules app.ts
 * @description App store module
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

import { defineStore } from "pinia";
import { path } from "@tauri-apps/api";

// 用于存储原生数据的路径
const appDataDir = `${await path.appLocalDataDir()}appData`;
// 用于存储用户数据的路径
const userDataDir = `${await path.appLocalDataDir()}userData`;
// 用于存储合并数据的路径-列表渲染时使用，减少重复计算
const mergeDataDir = `${await path.appLocalDataDir()}mergeData`;
// 用于开发者模式的路径
const devDataDir = `${await path.resolve("../")}\\src\\data`;

const useAppStore = defineStore({
	id: "app",
	state: () => {
		return {
			// 是否加载数据
			loading: false,
			// 侧边栏设置
			sidebar: true,
			// 数据路径
			dataPath: {
				app: appDataDir,
				user: userDataDir,
				merge: mergeDataDir,
				dev: devDataDir,
			},
			// 应用数据路径
			appPath: {
				achievements: `${appDataDir}\\achievements.json`,
				achievementSeries: `${appDataDir}\\achievementSeries.json`,
				nameCards: `${appDataDir}\\nameCards.json`,
			},
			// 用户数据路径
			userPath: {
				achievements: `${userDataDir}\\achievements.json`,
			},
			// 合并数据路径
			mergePath: {
				achievements: `${mergeDataDir}\\achievements.json`,
				achievementSeries: `${mergeDataDir}\\achievementSeries.json`,
			},
			// 开发者模式
			devPath: {
				app: `${devDataDir}\\app`,
				merge: `${devDataDir}\\merge`,
			},
		};
	},
	actions: {
		// 初始化配置
		async init() {
			// 初始化加载状态
			this.loading = false;
			// 初始化侧边栏设置
			this.sidebar = true;
			// 初始化用户数据路径
			this.userPath = {
				achievements: `${userDataDir}\\achievements.json`,
			};
			// 初始化合并数据路径
			this.mergePath = {
				achievements: `${mergeDataDir}\\achievements.json`,
				achievementSeries: `${mergeDataDir}\\achievementSeries.json`,
			};
			// 初始化开发者模式
			this.devPath = {
				app: `${devDataDir}\\app`,
				merge: `${devDataDir}\\merge`,
			};
		},
	},
	persist: true,
});

export default useAppStore;
