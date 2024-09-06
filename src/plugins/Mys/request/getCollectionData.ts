/**
 * @file plugins/Mys/request/getCollectionPosts.ts
 * @description Mys 获取合集帖子
 * @since Beta v0.5.5
 */

import TGHttp from "../../../utils/TGHttp.js";
import MysApi from "../api/index.js";

/**
 * @description 获取合集帖子
 * @since Beta v0.5.0
 * @param {string} collectionId 合集 ID
 * @returns {Promise<TGApp.Plugins.Mys.Post.FullData[]>}
 */
export async function getCollectionPosts(
  collectionId: string,
): Promise<TGApp.Plugins.Mys.Collection.Data[]> {
  const url = "https://bbs-api.miyoushe.com/post/wapi/getPostFullInCollection";
  const params = { collection_id: collectionId };
  const resp = await TGHttp<TGApp.Plugins.Mys.Collection.ResponsePosts>(url, {
    method: "GET",
    query: params,
    headers: { "Content-Type": "application/json", Referer: MysApi.PostReferer },
  });
  return resp.data.posts;
}
