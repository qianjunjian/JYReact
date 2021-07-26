export default function createStore(reducer, enhancer) {

    if (enhancer) {
        return enhancer(createStore)(reducer);
    }

    let currentState;
    let currentListeners = [];

    function getState() {
        return currentState;
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        // 通知组件state已修改
        currentListeners.forEach(listeners => listeners());
    }

    // 订阅
    function subscribe(listener) {
        currentListeners.push(listener);
        return () => {
            const index = currentListeners.indexOf(listener);
            currentListeners.splice(index, 1);
        }
    }

    dispatch({type: "REUDX/AAAAAAAAAAAAABUGDUFSDFSDFSDFSF"})

    return {
        getState,
        dispatch,
        subscribe
    }
}