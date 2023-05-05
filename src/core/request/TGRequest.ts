/**
 * @file core request TGRequest.ts
 * @description 应用用到的请求函数
 * @author BTMuli<bt-muli@outlook.com>
 * @since Alpha v0.2.0
 */

import { getAnnoList, getAnnoContent } from "./getAnno";
import {
  getTokensByLoginTicket, getLtokenBySToken,
  getCookieTokenBySToken, vetifySToken,
} from "./getTokens";
import {
  getGameCardByCookie, getGameAccountsbyCookie,
  getAccountsbySToken, getGameRoleList,
} from "./getGameData";

const TGRequest = {
  Anno: {
    getList: getAnnoList,
    getContent: getAnnoContent,
  },
  User: {
    byLoginTicket: {
      getLTokens: getTokensByLoginTicket,
    },
    byCookie: {
      getAccounts: getGameAccountsbyCookie,
      getGameCard: getGameCardByCookie,
      getCharacter: getGameRoleList,
    },
    bySToken: {
      vertify: vetifySToken,
      getLToken: getLtokenBySToken,
      getAccounts: getAccountsbySToken,
      getCookieToken: getCookieTokenBySToken,
    },
  },
};

export default TGRequest;
