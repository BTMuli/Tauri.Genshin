/**
 * @file plugins/Mys/utils/getPositionCard.ts
 * @description Mys 插件热点追踪工具
 * @since Beta v0.5.3
 */

import Mys from "../index.js";

/**
 * @description 根据热点追踪信息转为渲染用的数据
 * @since Beta v0.5.3
 * @param {TGApp.Plugins.Mys.Position.Data[]} positionData 列表
 * @returns {TGApp.Plugins.Mys.Position.RenderCard[]} 返回列表
 */
function getPositionCard(
  positionData: TGApp.Plugins.Mys.Position.Data[],
): TGApp.Plugins.Mys.Position.RenderCard[] {
  const res: TGApp.Plugins.Mys.Position.RenderCard[] = [];
  for (const position of positionData) {
    let endStr: string;
    if (position.end_time === "0") {
      endStr = "";
    } else {
      endStr = new Date(Number(position.end_time)).toLocaleDateString().replace(/\//g, "-");
    }
    let link = position.url;
    if (position.url === "" && position.content_id !== 0) {
      link = Mys.Api.Obc.replace("{contentId}", position.content_id.toString());
    }
    const card: TGApp.Plugins.Mys.Position.RenderCard = {
      title: position.title,
      postId: position.url !== "" ? Number(position.url.split("/").pop()) : position.content_id,
      link: link,
      icon: position.icon,
      abstract: position.abstract,
      time: {
        start: position.create_time.split(" ")[0].replace(/\//g, "-"),
        startStamp: new Date(position.create_time).getTime(),
        end: endStr,
        endStamp: Number(position.end_time),
      },
    };
    res.push(card);
  }
  return res;
}

export default getPositionCard;
