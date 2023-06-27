/**
 * @file plugins Mys utils getPositionCard.ts
 * @description Mys 插件热点追踪工具
 * @author BTMuli <bt-muli@outlook.com>
 * @since Alpha v0.2.1
 */

/**
 * @description 根据热点追踪信息转为渲染用的数据
 * @since Alpha v0.1.5
 * @param {TGApp.Plugins.Mys.Position.Data[]} positionData 列表
 * @returns {TGApp.Plugins.Mys.Position.RenderCard[]} 返回列表
 */
function getPositionCard(
  positionData: TGApp.Plugins.Mys.Position.Data[],
): TGApp.Plugins.Mys.Position.RenderCard[] {
  const res: TGApp.Plugins.Mys.Position.RenderCard[] = [];
  positionData.map((position) => {
    let endStr: string;
    if (position.end_time === "0") {
      endStr = "";
    } else {
      endStr = new Date(Number(position.end_time)).toLocaleDateString().replace(/\//g, "-");
    }
    return res.push<TGApp.Plugins.Mys.Position.RenderCard>({
      title: position.title,
      postId: Number(position.url.split("/").pop()),
      icon: position.icon,
      abstract: position.abstract,
      time: {
        start: position.create_time.split(" ")[0].replace(/\//g, "-"),
        startStamp: new Date(position.create_time).getTime(),
        end: endStr,
        endStamp: Number(position.end_time),
      },
    });
  });
  return res;
}

export default getPositionCard;
