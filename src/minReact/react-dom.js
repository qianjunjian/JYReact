function render(vnode, container) {
    const node = createNode(vnode);
    container.appendChild(node);
}

function isString(s) {
    return typeof s === "string";
  }

function createNode(vnode) {
    const { type, props } = vnode;
    let node;
    if (isString(type)) {
        // 原生组件
        node = document.createElement(type);
        // 协调子节点
        reconcileChildren(node, props.children);
        // 更新属性
        updateNode(node, props);
    } else if (typeof type === "function") {
        node = type.prototype.isReactComponent ? updateClassComponent(vnode)
        : updateFunctionComponent(vnode);
    } else if (type === undefined) {
        // 文本
        node = document.createTextNode(vnode);
    } else {
        node = document.createDocumentFragment();
        // 协调子节点
        reconcileChildren(node, props.children);
    }
    return node;
}

function updateClassComponent(vnode) {
    const { type, props } = vnode;
    const instance = new type(props);
    const _vnode = instance.render();
    const node = createNode(_vnode);
    return node;
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const _vnode = type(props);
    const node = createNode(_vnode);
    return node;
}

function reconcileChildren(node, children) {
    const newChildren = Array.isArray(children) ? children : [children];
    for (let i = 0; i < newChildren.length; i++) {
        render(newChildren[i], node);
    }
}

function updateNode(node, props) {
    Object.keys(props).filter(v => v !== "children").forEach(v => {
        node[v] = props[v]
    })
}

export default { render }