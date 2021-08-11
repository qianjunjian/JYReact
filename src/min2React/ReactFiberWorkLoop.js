import {
    updateHostComponent,
    updateFunctionComponent,
    updateClassComponent
} from "./ReactFiberReconciler";

let wipRoot = null;
let nextUnitOfWork = null;

export const scheduleUpdateOnFiber = function(fiber) {
    wipRoot = fiber;
    wipRoot.sibling = null;

    nextUnitOfWork = wipRoot;
}

// 提交，把Fiber更新到dom节点上
function commitRoot() {
    commitWorker(wipRoot.child);
}

function commitWorker(fiber) {
    if (!fiber) {
        return;
    }
    const { stateNode } = fiber;
    let parentNode = getParentNode(fiber);
    // 提交自己
    if (stateNode) {
        parentNode.appendChild(stateNode);
    }
    // 提交子节点
    commitWorker(fiber.child);
    // 提交兄弟节点
    commitWorker(fiber.sibling)
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

function workLoop(IdleDeadline) {
    while(nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    // 提交
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
}

requestIdleCallback(workLoop);