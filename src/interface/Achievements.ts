/**
 * @file Achievements.ts
 * @description Achievements interface
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

/**
 * @description 本应用的成就类型
 * @since Alpha
 * @interface Achievement
 * @property {number} id - 成就 ID
 * @property {number} series - 成就系列 ID
 * @property {number} order - 成就排列顺序，用于展示全部成就
 * @property {string} name - 成就名称
 * @property {string} description - 成就描述
 * @property {number} reward - 成就奖励
 * @property {number} progress - 成就进度
 * @property {string} version - 成就版本
 * @return Achievement
 */
export interface Achievement {
	id: number;
	series: number;
	order: number;
	name: string;
	description: string;
	reward: number;
	progress: number;
	version: string;
}

/**
 * @description 本应用的成就系列类型
 * @since Alpha
 * @interface AchievementSeries
 * @property {number} id - 成就系列 ID
 * @property {number} order - 成就系列排列顺序，用于展示全部成就系列
 * @property {string} name - 成就系列名称
 * @description 有的成就系列没有名片奖励，这边的 card 可能为 undefined
 * @property {number} card - 成就系列奖励，这边是名片 ID
 * @description 像是天地万象这种一直更新的成就系列，这边的 version 可能为 undefined
 * @property {string} version - 成就系列版本
 * @property {string} icon - 成就系列图标 todo
 * @todo 为了方便列表展示，可能的话也加上成就系列包含的成就数以及已完成的成就数
 * @return AchievementSeries
 */
export interface AchievementSeries {
	id: number;
	order: number;
	name: string;
	card?: number;
	version?: string;
	icon?: string;
}

/**
 * @description 用于展示的成就系列类型-菜单栏左侧
 * @interface AchievementSeriesDisplay
 * @property {number} id - 成就系列 ID
 * @property {number} order - 成就系列排列顺序，用于展示全部成就系列
 * @property {string} name - 成就系列名称
 * @property {AchievementDisplay[]} achievements - 成就系列包含的成就
 * @property {number} total_count - 成就系列包含的成就数
 * @property {number} completed_count - 成就系列已完成的成就数
 * @property {number} card - 成就系列奖励，这边是名片 ID todo
 * @property {string} icon - 成就系列图标 todo
 * @return AchievementSeriesDisplay
 */
export interface AchievementSeriesDisplay {
	id: number;
	order: number;
	name: string;
	achievements: AchievementDisplay[];
	total_count: number;
	completed_count: number;
	card?: number;
	icon?: string;
}

/**
 * @description 用于展示的成就类型-菜单栏右侧
 * @interface AchievementDisplay
 * @property {number} id - 成就 ID
 * @property {number} order - 成就排列顺序，用于展示全部成就
 * @property {string} name - 成就名称
 * @property {string} description - 成就描述
 * @property {number} reward - 成就奖励
 * @property {boolean} completed - 成就是否已完成
 * @property {string} completed_time - 成就完成时间
 * @return AchievementDisplay
 */
export interface AchievementDisplay {
	id: number;
	order: number;
	name: string;
	description: string;
	reward: number;
	completed: boolean;
	completed_time?: string;
}
