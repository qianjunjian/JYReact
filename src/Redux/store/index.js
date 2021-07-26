import { createStore, applyMiddleware } from "../redux/";
import isPromise from "is-promise";

// 定义修改规则
function countReducer(state = 0, action) {
    switch (action.type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            return state - action.payload || 1;
        default:
            return state;
    }
}

const store = createStore(combineReducers({aaa: countReducer}), applyMiddleware(thunk, promise, logger));

function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers)
    const finalReducers = {}
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i] 
      if (typeof reducers[key] === 'function') {
        finalReducers[key] = reducers[key]
      }
    }
    const finalReducerKeys = Object.keys(finalReducers)
  
    return function combination(state = {}, action) {
      let hasChanged = false
      const nextState = {}
      for (let i = 0; i < finalReducerKeys.length; i++) {
        const key = finalReducerKeys[i]
        const reducer = finalReducers[key]
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)    
        nextState[key] = nextStateForKey
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
      return hasChanged ? nextState : state
    }
}

// 处理异步的thunk
function thunk({dispatch, getState}) {
    return (next) => {
        return (action) => {
            if (typeof action === "function") {
              console.log(">>>>>>>>>>>1")
              return action(dispatch, getState);
            }
            console.log(">>>>>>>>>>>2")
            return next(action);
        };
    }
}

function logger({dispatch, getState}) {
    return (next) => {
        return (action) => {
            console.log(">>>>>>>>>>>3")
            console.log("--------------------------");
            console.log(action.type, "执行啦！");
            let prevState = getState();
            console.log("prev state", prevState); 
            const returnValue = next(action);
            let nextState = getState();
            console.log("next state", nextState);
            console.log("--------------------------");
        
            return returnValue;
          };
    }
}

function promise({dispatch}) {
    return (next) => (action) => {
        console.log(">>>>>>>>>>>4")
      return isPromise(action) ? action.then(dispatch) : next(action);
    };
}

export default store;