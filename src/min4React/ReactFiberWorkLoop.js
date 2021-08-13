import {
    updateHostComponent,
    updateFunctionComponent,
    updateClassComponent,
    Placement,
    Update,
    updateNode
} from "./ReactFiberReconciler";
import {scheduleCallback, shouldYield} from "./scheduler";

let wipRoot = null;
let nextUnitOfWork = null;

export const scheduleUpdateOnFiber = function(fiber) {
    fiber.alternate = {...fiber};
    wipRoot = fiber;
    wipRoot.sibling = null;
    nextUnitOfWork = wipRoot;

    scheduleCallback(workLoop);
}

// 提交，把Fiber更新到dom节点上
function commitRoot() {
    typeof wipRoot === "function" ? commitWorker(wipRoot) : commitWorker(wipRoot.child);
}

function commitWorker(fiber) {
    if (!fiber) {
        return;
    }

    const { stateNode, flags, type } = fiber;

    if (typeof type === "function") {
        invokeHooks(fiber);
    }

    let parentNode = getParentNode(fiber);
    // 提交自己
    if (flags & Placement && stateNode) {
        parentNode.appendChild(stateNode);
    }
    // 更新属性
    if (flags & Update && stateNode) {
        updateNode(stateNode, fiber.alternate.props, fiber.props);
    }
    // 提交子节点
    commitWorker(fiber.child);
    // 提交兄弟节点
    commitWorker(fiber.sibling)
}

function invokeHooks(wip) {
    const {updateQueueOfLayout, updateQueueOfEffect} = wip;
    for (let i = 0; i < updateQueueOfLayout.length; i++) {
        const effect = updateQueueOfLayout[i];
        effect.create();
    }

    for (let i = 0; i < updateQueueOfEffect.length; i++) {
        const effect = updateQueueOfEffect[i];
        scheduleCallback(() => {
            effect.create();
        });
    }
}

// 找父dom节点
function getParentNode(fiber) {
    let next = fiber.return;
    while (!next.stateNode) {
      next = next.return;
    }
  
    return next.stateNode;
}

// 协调
function performUnitOfWork(fiber) {
    const { type } = fiber;
    // 更新自己
    if (typeof type === "string") {
        // 原生标签
        updateHostComponent(fiber);
    } else if (typeof type === "function") {
        if (type.prototype.isReactComponent) {
            // 类组件
            updateClassComponent(fiber);
        } else {
            // 函数组件
            updateFunctionComponent(fiber);
        }
        
    }

    // 返回下一个子节点
    if (fiber.child) {
        return fiber.child;
    }

    // 返回兄弟节点
    let next = fiber;
    while (next) {
        if (next.sibling) {
            return next.sibling;
        }
        next = next.return;
    }
}

function workLoop() {
    while(nextUnitOfWork && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    // 提交
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
}

// requestIdleCallback(workLoop);