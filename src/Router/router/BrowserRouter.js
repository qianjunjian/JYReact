import {Component} from "react";
import Router from "./Router";
import {createBrowserHistory} from "history";

class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createBrowserHistory();
    }
    render() {
        return <Router history={this.history} children={this.props.children}></Router>
    }
}

export default BrowserRouter;