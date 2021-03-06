  import {useContext} from "react";
  import RouterContext from "./RouterContext";

function Link({to, children, ...rest}) {

    const context = useContext(RouterContext);

    const handle = (e) => {
        e.preventDefault();
        context.history.push(to);
    };

    return (
        <a href={to} onClick={handle} {...rest}>
          {children}
        </a>
    );
}

export default Link;