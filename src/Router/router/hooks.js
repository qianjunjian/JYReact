import {useContext} from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

export const useLocation = () => {
    return useContext(RouterContext).location;
}

export const useHistory = () => {
    return useContext(RouterContext).history;
}

export const useRouteMatch = () => {
    return useContext(RouterContext).match;
}

export const useParams = () => {
    const match = useContext(RouterContext).match;
    return match ? match.params : {};
}