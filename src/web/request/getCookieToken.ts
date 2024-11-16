/**
 * @file web/request/getCookieToken.ts
 * @description 获取 Cookie Token 的请求函数
 * @since Beta v0.5.0
 */

import TGHttp from "../../utils/TGHttp.js";
import TGApi from "../api/TGApi.js";
import { getRequestHeader } from "../utils/getRequestHeader.js";

/**
 * @description 根据 stoken 获取 cookie_token
 * @since Beta v0.5.0
 * @param {string} Mid 登录用户的 mid
 * @param {string} Stoken stoken_v2
 * @returns {Promise<string|TGApp.BBS.Response.Base>}
 */
export async function getCookieTokenBySToken(
  Mid: string,
  Stoken: string,
): Promise<string | TGApp.BBS.Response.Base> {
  const url = TGApi.GameTokens.getCookieToken;
  const cookie = { mid: Mid, stoken: Stoken };
  const params = { stoken: Stoken };
  const header = getRequestHeader(cookie, "GET", params, "common");
  const resp = await TGHttp<TGApp.BBS.Response.getCookieTokenBySToken | TGApp.BBS.Response.Base>(
    url,
    {
      method: "GET",
      headers: header,
      query: params,
    },
  );
  if (resp.retcode !== 0) return <TGApp.BBS.Response.Base>resp;
  return resp.data.cookie_token;
}

/**
 * @description 根据 gameToken 获取 cookie_token
 * @since Beta v0.5.0
 * @param {string} accountId 账号 id
 * @param {string} gameToken gameToken
 * @returns {Promise<string|TGApp.BBS.Response.Base>}
 */
export async function getCookieTokenByGameToken(
  accountId: string,
  gameToken: string,
): Promise<string | TGApp.BBS.Response.Base> {
  const url = "https://api-takumi.mihoyo.com/auth/api/getCookieAccountInfoByGameToken";
  const data = { account_id: Number(accountId), game_token: gameToken };
  const resp = await TGHttp<TGApp.BBS.Response.getCookieTokenByGameToken | TGApp.BBS.Response.Base>(
    url,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
  if (resp.retcode !== 0) return <TGApp.BBS.Response.Base>resp;
  return resp.data.cookie_token;
}
