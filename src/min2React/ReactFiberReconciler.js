import {createFiber} from "./fiber";

export function updateHostComponent(wip) {
    if (!wip.stateNode) {
        wip.stateNode = document.createElement(wip.type);
        // 更新属性
        updateNode(wip.stateNode, wip.props);
    }

    // 协调子节点, 创建Fiber
    reconcileChildren(wip, wip.props.children);
}

export function updateFunctionComponent(wip) {
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
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i];
        const newFiber = createFiber(newChild, returnFiber);

        if (previousNewFiber === null) {
            returnFiber.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }
}

function updateNode(node, props) {
    Object.keys(props).forEach(v => {
        if (v === "children") {
            if (typeof props[v] === "string") {
                node.textContent = props[v];
            }
        } else {
            node[v] = props[v];
        }
    })
}