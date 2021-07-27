import { useState, useCallback, useReducer } from "react";

export const useForceUpdate = () => {
    const [, setState] = useState(0);

    const forceUpdate = useCallback(
        () => {
            setState(pre => pre + 1);
        },
        [],
    )

    return forceUpdate
}

export const useForceUpdate2 = () => {
    const [, update] = useReducer(x => x + 1);

    const forceUpdate = useCallback(
        () => {
            update();
        },
        [],
    )

    return forceUpdate
}