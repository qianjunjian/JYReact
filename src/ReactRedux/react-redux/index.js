import { createContext, useContext, useLayoutEffect } from "react";
import { useForceUpdate } from "../use/useForceUpdate";

const Context = createContext();

export function Provider({store, children}) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = (mapStateToProps, mapDispatchToProps) =>
    (WrapComponent) => (props) => {
        const store = useContext(Context);
        const stateProps = mapStateToProps(store.getState());
        const dispatch = store.dispatch;
        let dispatchProps = {};
        if (typeof mapDispatchToProps === "function") {
            dispatchProps = mapDispatchToProps(dispatch);
        } else if (typeof mapDispatchToProps === "object") {
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        }
        dispatchProps.dispatch = dispatch

        const forceUpdate = useForceUpdate();
        useLayoutEffect(() => {
            const undispatch = store.subscribe(() => {
                forceUpdate()
            });
            return () => {
                undispatch()
            }
        }, [store, forceUpdate]);

        return <WrapComponent {...props} {...stateProps} {...dispatchProps}  />
    }

export function bindActionCreators(creators, dispatch) {
    let obj = {};
    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch);
    }
    return obj;
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export const useDispatch = () => {
    const store = useContext(Context);
    return store.dispatch 
}

export const useSelector = (selctor) => {
    const store = useContext(Context);
    const selectedState  = selctor(store.getState());

    const forceUpdate = useForceUpdate();
    useLayoutEffect(() => {
        const undispatch = store.subscribe(() => {
            forceUpdate()
        });
        return () => {
            undispatch()
        }
    }, [store, forceUpdate]);

    return selectedState;
}