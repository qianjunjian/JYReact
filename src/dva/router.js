import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage";
import ExamplePage from "./routes/ExamplePage";
import { UserDynamicPage } from "./dynamic";

function RouterConfig({ history }) {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/example" component={ExamplePage} />
          <Route path="/user" component={UserDynamicPage} />
        </Switch>
      </Router>
    );
  }
  
  export default RouterConfig;