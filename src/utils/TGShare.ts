/**
 * @file utils/TGShare.ts
 * @description 生成分享截图并保存到本地
 * @since Beta v0.4.4
 */

import { dialog, fs, http, path } from "@tauri-apps/api";
import html2canvas from "html2canvas";

import showConfirm from "../components/func/confirm";
import showSnackbar from "../components/func/snackbar";

import TGLogger from "./TGLogger";
import { bytesToSize } from "./toolFunc";

/**
 * @description 保存图片-canvas
 * @since Beta v0.4.4
 * @param {Uint8Array} buffer - 图片数据
 * @param {string} filename - 文件名
 * @param {string} format - 文件格式
 * @returns {Promise<void>} 无返回值
 */
export async function saveCanvasImg(
  buffer: Uint8Array,
  filename: string,
  format?: string,
): Promise<void> {
  if (format === undefined) format = "png";
  await dialog
    .save({
      title: "保存图片",
      filters: [{ name: "图片", extensions: [format] }],
      defaultPath: `${await path.downloadDir()}${path.sep}${filename}.${format}`,
    })
    .then(async (res) => {
      if (res === null) return;
      await fs.writeBinaryFile({
        path: res,
        contents: buffer,
      });
    });
  await TGLogger.Info(`[saveCanvasImg][${filename}] 已将图像保存到本地`);
}

/**
 * @description 将图片保存到本地
 * @since Alpha v0.2.0
 * @param {string} url - 图片链接
 * @returns {Promise<string>} 图片元素
 */
export async function saveImgLocal(url: string): Promise<string> {
  return await http
    .fetch<ArrayBuffer>(url, {
      method: "GET",
      responseType: http.ResponseType.Binary,
    })
    .then(async (res) => {
      const buffer = new Uint8Array(res.data);
      const blob = new Blob([buffer], { type: "image/png" });
      return URL.createObjectURL(blob);
    });
}

/**
 * @description 返回图片 buffer
 * @since Beta v0.4.4
 * @param {string} url - 图片链接
 * @returns {Promise<Uint8Array>} 图片 buffer
 */
export async function getImageBuffer(url: string): Promise<Uint8Array> {
  return await http
    .fetch<ArrayBuffer>(url, {
      method: "GET",
      responseType: http.ResponseType.Binary,
    })
    .then((res) => new Uint8Array(res.data));
}

/**
 * @description 获取分享截图背景色
 * @since Beta v0.3.2
 * @returns {string} 背景色
 */
function getShareImgBgColor(): string {
  let theme = localStorage.getItem("theme");
  if (theme) {
    theme = JSON.parse(theme).theme;
  }
  if (theme === "dark") {
    return "#1e1e1e";
  } else {
    return "#f9f6f2";
  }
}

/**
 * @description 生成分享截图
 * @since Beta v0.4.2
 * @param {string} fileName - 文件名
 * @param {HTMLElement} element - 元素
 * @param {number} scale - 缩放比例
 * @returns {Promise<void>} 无返回值
 */
export async function generateShareImg(
  fileName: string,
  element: HTMLElement,
  scale: number = 1.2,
): Promise<void> {
  const canvas = document.createElement("canvas");
  const width = element.clientWidth + 30;
  const height = element.clientHeight + 30;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const opts = {
    backgroundColor: getShareImgBgColor(),
    windowHeight: height,
    scale,
    width,
    height,
    useCORS: true,
    canvas,
    x: -10,
    y: -15,
    dpi: 350,
  };
  const canvasData = await html2canvas(element, opts);
  const buffer = new Uint8Array(
    atob(canvasData.toDataURL("image/png").split(",")[1])
      .split("")
      .map((item) => item.charCodeAt(0)),
  );
  const size = buffer.length;
  const sizeStr = bytesToSize(size);
  await TGLogger.Info(`[generateShareImg][${fileName}] 图像大小为 ${sizeStr}`);
  if (size > 80000000) {
    showSnackbar({
      text: `图像大小为 ${sizeStr}，过大，无法保存`,
      color: "warn",
      timeout: 3000,
    });
    return;
  }
  if (size > 20000000) {
    const sizeStr = bytesToSize(size);
    const saveFile = await showConfirm({
      title: "图像过大",
      text: `图像大小为 ${sizeStr}，是否保存到文件？`,
    });
    if (saveFile === true) {
      await saveCanvasImg(buffer, fileName);
      return;
    }
    showSnackbar({
      color: "warn",
      text: "将尝试保存到剪贴板",
    });
  }
  try {
    await copyToClipboard(buffer);
    showSnackbar({
      text: `已将 ${fileName} 复制到剪贴板，大小为 ${sizeStr}`,
    });
    await TGLogger.Info(`[generateShareImg][${fileName}] 已将图像复制到剪贴板`);
  } catch (e) {
    await saveCanvasImg(buffer, fileName);
  }
}

/**
 * @description 复制到剪贴板
 * @since Beta v0.3.7
 * @param {Uint8Array} buffer - 图片数据
 * @returns {Promise<void>} 无返回值
 */
export async function copyToClipboard(buffer: Uint8Array): Promise<void> {
  const blob = new Blob([buffer], { type: "image/png" });
  const url = URL.createObjectURL(blob);
  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
  URL.revokeObjectURL(url);
}
