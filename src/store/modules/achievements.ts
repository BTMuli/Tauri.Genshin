/**
 * @file store modules achievements.ts
 * @description Achievements store module
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.1.2
 */

// vue
import { ref } from "vue";
// pinia
import { defineStore } from "pinia";

export const useAchievementsStore = defineStore(
  "achievements", () => {
    // 成就数据
    const totalAchievements = ref(899);
    const finAchievements = ref(0);
    const lastVersion = ref("v3.5");
    const UIAFVersion = ref("v1.1");
    const title = ref("成就完成数：0/899 完成率：0%");

    function init (): void {
      totalAchievements.value = 899;
      finAchievements.value = 0;
      title.value = getTitle();
    }

    function getTitle (): string {
      return `成就完成数：${finAchievements.value}/${totalAchievements.value} 完成率：${(
        (finAchievements.value / totalAchievements.value) *
        100
      ).toFixed(2)}%`;
    }

    function flushData (total: number, fin: number): void {
      totalAchievements.value = total;
      finAchievements.value = fin;
      title.value = getTitle();
    }

    return {
      totalAchievements,
      finAchievements,
      lastVersion,
      UIAFVersion,
      title,
      init,
      getTitle,
      flushData,
    };
  },
  {
    persist: true,
  });
