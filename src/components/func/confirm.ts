/**
 * @file component func confirm.ts
 * @description 封装自定义 confirm 组件，通过函数调用的方式，简化 confirm 的使用
 * @author BTMuli <bt-muli@outlook.com>
 * @since Alpha v0.2.3
 */

// vue
import { h, render, type VNode } from "vue";
// confirm
import confirm from "./confirm.vue";

const confirmId = "tg-func-confirm";

const renderBox = (props: TGApp.Component.Confirm.Params): VNode => {
  const container = document.createElement("div");
  container.id = confirmId;
  const boxVNode: VNode = h(confirm, props);
  render(boxVNode, container);
  document.body.appendChild(container);
  return boxVNode;
};

let confirmInstance: any;

const showConfirm = async (props: TGApp.Component.Confirm.Params): Promise<string | boolean> => {
  if (confirmInstance) {
    const boxVue = confirmInstance.component;
    return boxVue.exposeProxy.displayBox(props);
  } else {
    confirmInstance = renderBox(props);
    return await showConfirm(props);
  }
};

export default showConfirm;
