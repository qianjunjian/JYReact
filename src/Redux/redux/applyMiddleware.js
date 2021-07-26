export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);
        // 初始值dispatch
        let dispatch = store.dispatch;
        const middleAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args),
        };
        const middlewaresChain = middlewares.map(mid => mid(middleAPI));

        dispatch = compose(...middlewaresChain)(store.dispatch)

        return {
            ...store,
            // 返回加强版的dispatch
            dispatch,
        };
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
      // 返回一个函数
      return (arg) => arg;
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}