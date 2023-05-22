/**
 * @file web request getGameAccounts.ts
 * @description 获取游戏账号信息相关请求函数
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.1.5
 */

// tauri
import { http } from "@tauri-apps/api";
// api
import TGApi from "../api/TGApi";
// utils
import TGUtils from "../utils/TGUtils";
import TGConstant from "../constant/TGConstant";

/**
 * @description 通过 stoken 获取游戏账号
 * @since Alpha v0.1.5
 * @param {string} stoken stoken
 * @param {string} stuid 登录用户 uid
 * @returns {Promise<TGApp.User.Game.Account[]|TGApp.BBS.Response.Base>}
 */
export async function getGameAccountsBySToken (stoken: string, stuid: string): Promise<TGApp.User.Account.Game[] | TGApp.BBS.Response.Base> {
  const url = TGApi.GameData.bySToken.getAccounts;
  const cookie = {
    stuid,
    stoken,
  };
  const params = { stoke: stoken, game_biz: TGConstant.Utils.GAME_BIZ };
  return await getGameAccounts(url, cookie, params);
}

/**
 * @description 通过 cookie 获取游戏账号
 * @since Alpha v0.1.5
 * @param {string} cookie_token cookie_token
 * @param {string} account_id 游戏账号 id
 * @returns {Promise<TGApp.User.Account.Game[]|TGApp.BBS.Response.Base>}
 */
export async function getGameAccountsByCookie (cookie_token: string, account_id: string): Promise<TGApp.User.Account.Game[] | TGApp.BBS.Response.Base> {
  const url = TGApi.GameData.byCookie.getAccounts;
  const cookie = {
    account_id,
    cookie_token,
  };
  const params = { game_biz: TGConstant.Utils.GAME_BIZ };
  return await getGameAccounts(url, cookie, params);
}

/**
 * @description 获取游戏账号信息
 * @since Alpha v0.2.0
 * @param {string} url 请求地址
 * @param {Record<string, string>} cookie cookie
 * @param {Record<string, string>} params 请求参数
 * @returns {Promise<TGApp.User.Account.Game[]|TGApp.BBS.Response.Base>}
 */
async function getGameAccounts (url: string, cookie: Record<string, string>, params: Record<string, string>): Promise<TGApp.BBS.Response.Base | TGApp.User.Account.Game[]> {
  const header = TGUtils.User.getHeader(cookie, "GET", params, "common");
  return await http.fetch<TGApp.User.Account.GameResponse>(url, {
    method: "GET",
    headers: header,
    query: params,
  }).then(res => {
    if (res.data.retcode !== 0) return res.data;
    return res.data.data.list;
  });
}
