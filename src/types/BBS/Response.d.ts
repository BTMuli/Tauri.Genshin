/**
 * @file types/BBS/Response.d.ts
 * @description BBS 返回数据类型定义文件
 * @since Beta v0.6.0
 */

/**
 * @description BBS 返回数据类型定义
 * @since Beta v0.6.0
 * @namespace TGApp.BBS.Response
 * @memberof TGApp.BBS
 */
declare namespace TGApp.BBS.Response {
  /**
   * @description 基础返回类型，设计米游社接口请求都是这个类型
   * @interface Base
   * @since Beta v0.3.9
   * @property {never} retcode - 响应代码
   * @property {string} message - 响应消息
   * @property {never} data - 响应数据
   * @return Base
   */
  interface Base {
    retcode: number;
    message: string;
    data: never;
  }

  /**
   * @description 基础返回类型-带有 data 的
   * @interface BaseWithData
   * @since Beta v0.3.6
   * @property {0} retcode - 响应代码
   * @property {string} message - 响应消息
   * @property {any} data - 响应数据
   * @return BaseWithData
   */
  interface BaseWithData {
    retcode: 0;
    message: string;
    data: any;
  }

  /**
   * @description 根据 stoken 获取 ltoken 的响应数据
   * @interface getLTokenBySToken
   * @since Alpha v0.1.5
   * @extends BaseWithData
   * @property {string} data.ltoken - ltoken 值
   * @return getLTokenBySToken
   */
  interface getLTokenBySToken extends BaseWithData {
    data: {
      ltoken: string;
    };
  }

  /**
   * @description 根据 stoken 获取 cookie_token 的响应数据
   * @interface getCookieTokenBySToken
   * @since Alpha v0.1.5
   * @extends BaseWithData
   * @property {string} data.uid - 用户 uid
   * @property {string} data.cookie_token - cookie_token 值
   * @return getCookieTokenBySToken
   */
  interface getCookieTokenBySToken extends BaseWithData {
    data: {
      uid: string;
      cookie_token: string;
    };
  }

  /**
   * @description 通过 stoken 验证用户信息的返回类型
   * @interface verifyUserInfoBySToken
   * @since Alpha v0.1.5
   * @extends BaseWithData
   * @property {TGApp.BBS.Account.VerifySTokenInfo} data.user_info - 用户信息
   * @property {unknown} data.realname_info - 实名信息
   * @property {boolean} data.need_realperson - 是否需要实名认证
   * @return verifyUserInfoBySToken
   */
  interface verifyUserInfoBySToken extends BaseWithData {
    data: {
      user_info: TGApp.BBS.Account.VerifySTokenInfo;
      realname_info: unknown;
      need_realperson: boolean;
    };
  }

  /**
   * @description 通过 gameToken 获取 stoken 的返回类型
   * @interface getStokenByGameToken
   * @since Beta v0.3.0
   * @extends BaseWithData
   * @property {getStokenByGameTokenData} data - 返回数据
   * @return getStokenByGameToken
   */
  interface getStokenByGameToken extends BaseWithData {
    data: getStokenByGameTokenData;
  }

  /**
   * @description 通过 gameToken 获取 stoken 的返回类型数据
   * @interface getStokenByGameTokenData
   * @since Beta v0.3.0
   * @property {number} token.token_type - token 类型
   * @property {string} token.token - token 值
   * @property {TGApp.BBS.Account.getStokenByGameTokenInfo} user_info - 用户信息
   * @property {unknown} realname_info - 实名信息
   * @property {boolean} need_realperson - 是否需要实名认证
   * @return getStokenByGameToken
   */
  interface getStokenByGameTokenData {
    token: {
      token_type: number;
      token: string;
    };
    user_info: TGApp.BBS.Account.getStokenByGameTokenInfo;
    realname_info: unknown;
    need_realperson: boolean;
  }

  /**
   * @description 通过 stoken v1 获取 stoken v2 的返回类型
   * @interface getTokenBySToken
   * @since Beta v0.4.3
   * @extends BaseWithData
   * @property {getStokenByGameTokenData} data - 返回数据
   * @return getTokenBySToken
   */
  interface getTokenBySToken extends BaseWithData {
    data: getStokenByGameTokenData;
  }

  /**
   * @description 通过 stoken v1 获取 stoken v2 的返回类型数据
   * @interface getTokenBySTokenData
   * @since Beta v0.4.3
   * @property {unknown} need_realperson - 是否需要实名认证
   * @property {string} token.token - token 值
   * @property {number} token.token_type - token 类型
   * @description user_info 只写了用到的字段
   * @property {string} user_info.aid - 用户 aid
   * @property {string} user_info.mid - 用户 mid
   * @returns getTokenBySTokenData
   */
  interface getTokenBySTokenData {
    need_realperson: boolean;
    token: {
      token: string;
      token_type: number;
    };
    user_info: {
      aid: string;
      mid: string;
    };
  }

  /**
   * @description 通过 gameToken 获取 cookie_token 的返回类型
   * @interface getCookieTokenByGameToken
   * @since Beta v0.3.0
   * @extends BaseWithData
   * @property {string} data.uid - 用户 uid
   * @property {string} data.cookie_token - cookie_token 值
   * @return getCookieTokenByGameToken
   */
  interface getCookieTokenByGameToken extends BaseWithData {
    data: {
      uid: string;
      cookie_token: string;
    };
  }

  /**
   * @description 通过 sToken 获取 actionTicket 的返回类型
   * @interface getActionTicketBySToken
   * @since Beta v0.3.4
   * @extends BaseWithData
   * @property {string} data.ticket - actionTicket 值
   * @property {boolean} data.is_verified - 是否验证
   * @property {TGApp.BBS.Account.getActionTicketBySTokenInfo} data.account_info - 用户信息
   * @return getActionTicketBySToken
   */
  interface getActionTicketBySToken extends BaseWithData {
    data: {
      ticket: string;
      is_verified: boolean;
      account_info: TGApp.BBS.Account.getActionTicketBySTokenInfo;
    };
  }

  /**
   * @description 获取 deviceFp 的返回类型
   * @interface getDeviceFp
   * @since Beta v0.3.6
   * @extends BaseWithData
   * @property {string} data.device_fp - deviceFp 值
   * @property {number} data.code - code 值
   * @property {string} data.msg - msg 值
   * @return getDeviceFp
   */
  interface getDeviceFp extends BaseWithData {
    data: {
      device_fp: string;
      code: number;
      msg: string;
    };
  }

  /**
   * @description 获取游戏账户数据
   * @interface getGameAccounts
   * @since Beta v0.6.0
   * @extends BaseWithData
   * @property {TGApp.BBS.Account.GameAccount[]} data.list - 返回数据
   * @returns getGameAccounts
   */
  interface getGameAccounts extends BaseWithData {
    data: {
      list: TGApp.BBS.Account.GameAccount[];
    };
  }

  /**
   * @description 获取登录 ticket
   * @interface getAuthTicketByGameBiz
   * @since Beta v0.6.0
   * @extends BaseWithData
   * @property {string} data.ticket
   * @returns getAuthTicketByGameBiz
   */
  interface getAuthTicketByGameBiz extends BaseWithData {
    data: {
      ticket: string;
    };
  }
}
