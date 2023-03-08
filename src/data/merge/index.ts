/**
 * @file data merge index
 * @description data merge index
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha
 */

import achievements from "./achievements.json";
import achievementSeries from "./achievementSeries.json";
import { AchievementDisplay, AchievementSeriesDisplay } from "../../interface/Achievements";

export const MergeDataList = [
	{
		name: "achievements.json",
		data: achievements as AchievementDisplay[],
	},
	{
		name: "achievementSeries.json",
		data: achievementSeries as AchievementSeriesDisplay[],
	},
];

export const MergeData = {
	achievements: achievements as AchievementDisplay[],
	achievementSeries: achievementSeries as AchievementSeriesDisplay[],
};
