/**
 * @file src/utils/linkParser.ts
 * @description 处理链接
 * @since Beta v0.3.8
 */

import TGClient from "./TGClient";
import { createPost } from "./TGWindow";
import showConfirm from "../components/func/confirm";

/**
 * @function parseLink
 * @since Beta v0.3.8
 * @description 处理链接
 * @param {string} link - 链接
 * @param {boolean} useInner - 是否采用内置 JSBridge 打开
 * @returns {Promise<boolean|string>} - 处理情况，或者转换后的链接
 */
export async function parseLink(
  link: string,
  useInner: boolean = false,
): Promise<boolean | string> {
  const url = new URL(link);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    if (url.protocol === "mihoyobbs:") {
      if (url.pathname.startsWith("//article/")) {
        const postId = url.pathname.split("/").pop();
        if (!postId) return false;
        createPost(postId);
        return true;
      }
      if (url.pathname === "//webview" && url.search.startsWith("?link=")) {
        const urlTransform = decodeURIComponent(url.search.replace("?link=", ""));
        return await parseLink(urlTransform, useInner);
      }
      // todo 不保证转换后的链接可用
      if (url.pathname === "//openURL" && url.search.startsWith("?url=")) {
        const urlTransform = decodeURIComponent(url.search.replace("?url=", ""));
        return await parseLink(urlTransform, useInner);
      }
    }
    return false;
  }
  if (url.hostname === "bbs.mihoyo.com" || url.hostname === "www.miyoushe.com") {
    if (url.pathname.includes("/article/")) {
      const postId = url.pathname.split("/").pop();
      if (typeof postId !== "string") return false;
      createPost(postId);
      return true;
    }
  }
  if (url.hostname === "webstatic.mihoyo.com") {
    // 临时打的补丁
    if (url.pathname === "/bbs/event/signin/hkrpg/index.html") {
      return "https://act.mihoyo.com/bbs/event/signin/hkrpg/e202304121516551.html?bbs_auth_required=true&act_id=e202304121516551&bbs_presentation_style=fullscreen&utm_source=bbs&utm_medium=mys&utm_campaign=icon";
    }
  }
  const prefix = [
    "m.miyoushe.com",
    "act.mihoyo.com",
    "mhyurl.cn",
    "webstatic.mihoyo.com",
    "bbs.mihoyo.com",
    "qaa.miyoushe.com",
  ];
  if (prefix.includes(url.hostname)) {
    if (!useInner) {
      const openCheck = await showConfirm({
        title: "采用内置 JSBridge？",
        text: "取消则使用外部浏览器打开",
      });
      if (!openCheck) return url.href;
      const typeCheck = await showConfirm({
        title: "采用宽屏模式？",
        text: "取消则使用默认竖屏",
      });
      if (typeCheck) {
        await TGClient.open("web_act", link);
      } else {
        await TGClient.open("web_act_thin", link);
      }
      return true;
    }
  }
  return url.href.toString();
}
