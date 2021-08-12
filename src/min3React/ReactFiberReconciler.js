import {createFiber} from "./fiber";
import {renderHooks} from "./hooks";

export const NoFlags = /*                      */ 0b00000000000000000000;
export const Placement = /*                    */ 0b0000000000000000000010; // 2
export const Update = /*                       */ 0b0000000000000000000100; // 4
export const Deletion = /*                     */ 0b0000000000000000001000; // 8

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type);
        // 更新属性
        updateNode(wip.stateNode, {}, wip.props);
    }

    // 协调子节点, 创建Fiber
    reconcileChildren(wip, wip.props.children);
}

export function updateFunctionComponent(wip) {
    renderHooks(wip)
    const {type, props} = wip;
    const vnode = type(props);

    // 协调子节点, 创建Fiber
    reconcileChildren(wip, vnode);
}

export function updateClassComponent(wip) {
    const {type, props} = wip;
    const instance = new type(props);
    const children = instance.render();
    // 协调子节点, 创建Fiber
    reconcileChildren(wip, children);
}

// 协调子节点, 创建子节点Fiber
function reconcileChildren(returnFiber, children) {
    if (typeof children === "string") {
        return;
    }

    const newChildren = Array.isArray(children) ? children : [children];

    let previousNewFiber = null;

    // 子节点创建Fiber
    // 老节点的头结点
    let oldFiber = returnFiber.alternate && returnFiber.alternate.child;
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const newFiber = createFiber(newChild, returnFiber);
        const same = sameNode(oldFiber, newFiber);
        if (same) {
            // 更新
            Object.assign(newFiber, {
                alternate: oldFiber, // 老节点
                stateNode: oldFiber.stateNode, // dom节点
                flags: Update, // fiber标记更新
            });
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (previousNewFiber === null) {
            returnFiber.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }
}

function isStringOrNumber(s) {
    return typeof s === "string" || typeof s === "number";
}

export function updateNode(node, prevVal, nextVal) {
    Object.keys(prevVal)
      // .filter(k => k !== "children")
      .forEach((k) => {
        if (k === "children") {
          // 有可能是文本
          if (isStringOrNumber(prevVal[k])) {
            node.textContent = "";
          }
        } else if (k.slice(0, 2) === "on") {
          const eventName = k.slice(2).toLocaleLowerCase();
          node.removeEventListener(eventName, prevVal[k]);
        } else {
          if ((k in nextVal)) {
            node[k] = "";
          }
        }
      });
  
    Object.keys(nextVal)
      // .filter(k => k !== "children")
      .forEach((k) => {
        if (k === "children") {
          // 有可能是文本
          if (isStringOrNumber(nextVal[k])) {
            node.textContent = nextVal[k] + "";
          }
        } else if (k.slice(0, 2) === "on") {
          const eventName = k.slice(2).toLocaleLowerCase();
          node.addEventListener(eventName, nextVal[k]);
        } else {
          node[k] = nextVal[k];
        }
    });
}

function sameNode(a, b) {
    return !!(a && b && a.key === b.key && a.type === b.type);
}