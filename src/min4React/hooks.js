
import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

export const HookLayout = /*    */ 0b010;
export const HookPassive = /*   */ 0b100;

// 当前正在工作fiber
let currentlyRenderingFiber = null;
// 当前正在工作的hook
let workInProgressHook = null;
// 当前正在工作的hook对应的老hook
let currentHook = null;

export function renderHooks(fiber) {
    currentlyRenderingFiber = fiber;
    currentlyRenderingFiber.memoizedState = null; // hook0
    currentlyRenderingFiber.updateQueueOfEffect = [];
    currentlyRenderingFiber.updateQueueOfLayout = [];
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
            currentHook = currentHook.next;
        } else {
            // 第一个hook
            hook = workInProgressHook = current.memoizedState;
            currentHook = current.memoizedState;
        }

    } else {
        // 初次渲染
        currentHook = null;
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

export function useEffect(create, deps) {
    return updateEffectIml(HookPassive, create, deps);
}

export function useLayoutEffect(create, deps) {
    return updateEffectIml(HookLayout, create, deps);
}

export function updateEffectIml(hookFlag, create, deps) {
    const hook = updateWorkInProgressHook();

    const effect = {hookFlag, create, deps};

    // 组件更新的时候，且依赖项没有发生变化
    if (currentHook) {
        const prevEffect = currentHook.memoizedState;
        if (deps) {
            const prevDeps = prevEffect.deps;
            if (areHookInputsEqual(deps, prevDeps)) {
                return;
            }
        }
    }

    hook.memoizedState = effect;
    if (hookFlag & HookPassive) {
        currentlyRenderingFiber.updateQueueOfEffect.push(effect);
    } else if (hookFlag & HookLayout) {
        currentlyRenderingFiber.updateQueueOfLayout.push(effect);
    }
}

function areHookInputsEqual(nextDeps, prevDeps) {
    if (prevDeps === null) {
        return false;
    }
  
    for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
        if (Object.is(nextDeps[i], prevDeps[i])) {
            continue;
        }
        return false;
    }
    return true;
}