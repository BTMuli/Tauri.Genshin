/**
 * @file src/data/index.ts
 * @description 数据文件入口
 * @since Beta v0.5.3
 */

import type { Schema } from "ajv";

import achievements from "./app/achievements.json" with { type: "json" };
import achievementSeries from "./app/achievementSeries.json" with { type: "json" };
import calendar from "./app/calendar.json" with { type: "json" };
import character from "./app/character.json" with { type: "json" };
import gacha from "./app/gacha.json" with { type: "json" };
import nameCards from "./app/namecard.json" with { type: "json" };
import weapon from "./app/weapon.json" with { type: "json" };
import arcBirCalendar from "./archive/birth_calendar.json" with { type: "json" };
import arcBirDraw from "./archive/birth_draw.json" with { type: "json" };
import arcBirRole from "./archive/birth_role.json" with { type: "json" };
import schemaUiaf from "./schema/uiaf-schema.json" with { type: "json" };
import schemaUigf from "./schema/uigf-schema.json" with { type: "json" };
import schemaUigf4 from "./schema/uigf4-schema.json" with { type: "json" };
import wikiCharacter from "./WIKI/character.json" with { type: "json" };
import wikiMaterial from "./WIKI/material.json" with { type: "json" };
import wikiWeapon from "./WIKI/weapon.json" with { type: "json" };

// App
export const AppAchievementsData: Array<TGApp.App.Achievement.Item> = achievements;
export const AppAchievementSeriesData: Array<TGApp.App.Achievement.Series> = achievementSeries;
export const AppCalendarData: Array<TGApp.App.Calendar.Item> = calendar;
export const AppCharacterData: Array<TGApp.App.Character.WikiBriefInfo> = character;
export const AppGachaData: Array<TGApp.App.Gacha.PoolItem> = gacha;
export const AppNameCardsData: Array<TGApp.App.NameCard.Item> = nameCards;
export const AppWeaponData: Array<TGApp.App.Weapon.WikiBriefInfo> = weapon;
// Schema
export const UiafSchema: Schema = schemaUiaf;
export const UigfSchema: Schema = schemaUigf;
export const Uigf4Schema: Schema = schemaUigf4;
// Archive
export const ArcBirCalendar: TGApp.Archive.Birth.CalendarData = arcBirCalendar;
export const ArcBirDraw: Array<TGApp.Archive.Birth.DrawItem> = arcBirDraw;
export const ArcBirRole: Array<TGApp.Archive.Birth.RoleItem> = arcBirRole;
// Wiki
export const WikiCharacterData: Array<TGApp.App.Character.WikiItem> = wikiCharacter;
export const WikiWeaponData: Array<TGApp.App.Weapon.WikiItem> = wikiWeapon;
export const WikiMaterialData: Array<TGApp.App.Material.WikiItem> = wikiMaterial;
