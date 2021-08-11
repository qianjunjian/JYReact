import {scheduleUpdateOnFiber} from "./ReactFiberWorkLoop";

function render(vnode, container) {
    // 创建根节点Fiber
    const fiberRoot = {
        type: container.nodeName.toLocaleLowerCase(),
        stateNode: container,
        props: {
            children: vnode
        },
    };

    // 更新
    scheduleUpdateOnFiber(fiberRoot)
}

export default { render }