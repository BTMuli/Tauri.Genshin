/**
 * @file types/BBS/Account.d.ts
 * @description BBS 账户相关类型定义文件
 * @since Beta v0.6.7
 */

declare namespace TGApp.BBS.Account {
  /**
   * @description 游戏账号类型
   * @interface GameAccount
   * @since Beta v0.6.0
   * @property {string} game_biz 游戏 biz，例如 hk4e_cn
   * @property {string} game_uid 游戏 uid
   * @property {boolean} is_chosen 是否为当前选中账号
   * @property {boolean} is_official 是否为官服账号
   * @property {string} level 游戏等级
   * @property {string} nickname 游戏昵称
   * @property {string} region 游戏区域
   * @property {string} region_name 游戏区域名称
   * @return Game
   */
  interface GameAccount {
    game_biz: string;
    game_uid: string;
    is_chosen: boolean;
    is_official: boolean;
    level: string;
    nickname: string;
    region: string;
    region_name: string;
  }
}
