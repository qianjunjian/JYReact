
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

// 当前正在工作fiber
let currentlyRenderingFiber = null;
// 当前正在工作的hook
let workInProgressHook = null;

export function renderHooks(fiber) {
    currentlyRenderingFiber = fiber;
    currentlyRenderingFiber.memoizedState = null; // hook0
    workInProgressHook = null;
}

function updateWorkInProgressHook() {
    let hook = null;
    // 更新阶段 新的hook在老的hook基础上更新
    let current = currentlyRenderingFiber.alternate;
    if (current) {
        // 更新阶段 取出老的hooks
        currentlyRenderingFiber.memoizedState = current.memoizedState;
        // 取出当前正在工作hooks
        if (workInProgressHook) {
            // 非第一个hook
            hook = workInProgressHook = workInProgressHook.next;
        } else {
            // 第一个hook
            hook = workInProgressHook = current.memoizedState;
        }

    } else {
        // 初次渲染
        // 创建当前的hook
        hook = {
            memoizedState: null, // 状态值
            next: null, // 下一个hook
        };
        if (workInProgressHook) {
            // 非第一个hook
            workInProgressHook = workInProgressHook.next = hook;
        } else {
            // 第一个hook
            currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
        }
    }
    return hook;
}

export function useState(initalState) {
    const hook = updateWorkInProgressHook();

    // 设置初始值
    if (!currentlyRenderingFiber.alternate) {
        hook.memoizedState = initalState;
    }

    const dispatch = action => {
        hook.memoizedState = action;
        // 触发更新
        scheduleUpdateOnFiber(currentlyRenderingFiber)
    }

    return [hook.memoizedState, dispatch]
}