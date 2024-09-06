/**
 * @file utils/dataBS.ts
 * @description 用户数据的备份、恢复、迁移
 * @since Beta v0.5.5
 */

import { path } from "@tauri-apps/api";
import { exists, mkdir, writeTextFile, readDir, readTextFile } from "@tauri-apps/plugin-fs";

import showSnackbar from "../components/func/snackbar.js";
import TGSqlite from "../plugins/Sqlite/index.js";
import TSUserAchi from "../plugins/Sqlite/modules/userAchi.js";
import TSUserGacha from "../plugins/Sqlite/modules/userGacha.js";

import TGLogger from "./TGLogger.js";
import { exportUigfData, readUigfData, verifyUigfData } from "./UIGF.js";

/**
 * @description 备份用户数据
 * @since Beta v0.5.0
 * @param {string} dir 备份目录路径
 * @returns {Promise<void>}
 */
export async function backUpUserData(dir: string): Promise<void> {
  if (!(await exists(dir))) {
    console.log("备份目录不存在，创建备份目录");
    await mkdir(dir, { recursive: true });
  }
  const dataAchi = await TSUserAchi.getUIAF();
  await writeTextFile(`${dir}${path.sep()}UIAF.json`, JSON.stringify(dataAchi));
  // 备份 ck
  const dataCK = await TGSqlite.getCookie();
  await writeTextFile(`${dir}${path.sep()}cookie.json`, JSON.stringify(dataCK));
  // 备份深渊数据
  const dataAbyss = await TGSqlite.getAbyss();
  await writeTextFile(`${dir}${path.sep()}abyss.json`, JSON.stringify(dataAbyss));
  // 备份祈愿数据
  const uidList = await TSUserGacha.getUidList();
  for (const uid of uidList) {
    const dataGacha = await TSUserGacha.getGachaRecords(uid);
    const savePath = `${dir}${path.sep()}UIGF_${uid}.json`;
    await exportUigfData(uid, dataGacha, savePath);
  }
}

/**
 * @description 恢复用户数据
 * @since Beta v0.5.5
 * @param {string} dir 备份目录路径
 * @returns {Promise<void>}
 */
export async function restoreUserData(dir: string): Promise<void> {
  let errNum = 0;
  if (!(await exists(dir))) {
    showSnackbar({
      text: "备份目录不存在",
      color: "error",
    });
    return;
  }
  const filesRead = await readDir(dir);
  const files = filesRead.filter((item) => item.isFile && item.name.endsWith(".json"));
  await TGLogger.Info(`[DataBS][restoreUserData] files: ${JSON.stringify(files)}`);
  // 恢复成就数据
  const achiFind = files.find((item) => item.name === "UIAF.json");
  if (achiFind) {
    try {
      const dataAchi: TGApp.Plugins.UIAF.Achievement[] = JSON.parse(
        await readTextFile(achiFind.name),
      );
      await TSUserAchi.mergeUIAF(dataAchi);
      await TGLogger.Info(`[DataBS][restoreUserData] 成就数据恢复成功`);
    } catch (e) {
      showSnackbar({
        text: `成就数据恢复失败 ${e}`,
        color: "error",
      });
      await TGLogger.Error(`[DataBS][restoreUserData] 成就数据恢复失败 ${e}`);
      errNum++;
    }
  } else {
    showSnackbar({
      text: "成就数据恢复失败，备份文件不存在",
      color: "warn",
    });
    await TGLogger.Warn(`[DataBS][restoreUserData] 未检测到成就数据备份文件`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  // 恢复 ck
  const ckFind = files.find((item) => item.name === "cookie.json");
  if (ckFind) {
    try {
      const dataCK = await readTextFile(ckFind.name);
      await TGSqlite.saveAppData("cookie", JSON.stringify(JSON.parse(dataCK)));
      await TGLogger.Info(`[DataBS][restoreUserData] Cookie 数据恢复成功`);
    } catch (e) {
      showSnackbar({
        text: `Cookie 数据恢复失败 ${e}`,
        color: "error",
      });
      await TGLogger.Error(`[DataBS][restoreUserData] Cookie 数据恢复失败 ${e}`);
      errNum++;
    }
  } else {
    showSnackbar({
      text: "Cookie 数据恢复失败，备份文件不存在",
      color: "warn",
    });
    await TGLogger.Warn(`[DataBS][restoreUserData] 未检测到 Cookie 数据备份文件`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  // 恢复深渊数据
  const abyssFind = files.find((item) => item.name === "abyss.json");
  if (abyssFind) {
    try {
      const dataAbyss: TGApp.Sqlite.Abyss.SingleTable[] = JSON.parse(
        await readTextFile(abyssFind.name),
      );
      await TGSqlite.restoreAbyss(dataAbyss);
    } catch (e) {
      await TGLogger.Error(`[DataBS][restoreUserData] 深渊数据恢复失败 ${e}`);
      showSnackbar({
        text: "深渊数据恢复失败",
        color: "error",
      });
      errNum++;
    }
  } else {
    showSnackbar({
      text: "深渊数据恢复失败，备份文件不存在",
      color: "warn",
    });
    await TGLogger.Warn(`[DataBS][restoreUserData] 未检测到深渊数据备份文件`);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  // 恢复祈愿数据
  const reg = /UIGF_(\d+).json/;
  const dataGachaList = files.filter((item) => reg.test(item.name));
  for (const item of dataGachaList) {
    const check = await verifyUigfData(item.name);
    if (!check) {
      errNum++;
      continue;
    }
    const data = await readUigfData(item.name);
    const uid = data.info.uid;
    try {
      await TSUserGacha.mergeUIGF(uid, data.list);
      await TGLogger.Info(`[DataBS][restoreUserData] UID: ${uid} 祈愿数据恢复成功`);
    } catch (e) {
      showSnackbar({
        text: `UID: ${uid} 祈愿数据恢复失败`,
        color: "error",
      });
      await TGLogger.Error(`[DataBS][restoreUserData] UID: ${uid} 祈愿数据恢复失败 ${e}`);
      errNum++;
    }
  }
  if (errNum === 0) {
    showSnackbar({
      text: "数据恢复成功",
      color: "success",
    });
  } else {
    showSnackbar({
      text: `数据恢复失败，失败数量：${errNum}`,
      color: "error",
    });
  }
}
