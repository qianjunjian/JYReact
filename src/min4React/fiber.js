import {
  Placement,
} from "./ReactFiberReconciler";

export function createFiber(vnode, returnFiber) {
    const fiber = {
      type: vnode.type,
      key: vnode.key,
      props: vnode.props,
      stateNode: null, // 原生标签时候指dom节点，类组件时候指的是实例
      child: null, // 第一个子fiber
      sibling: null, // 下一个兄弟fiber
      return: returnFiber, // 父fiber
      // flags
      flags: Placement,
      alternate: null,
      deletions: null, // 要删除子节点 null或者[]
      index: null, //当前层级下的下标，从0开始
    };
  
    return fiber;
}