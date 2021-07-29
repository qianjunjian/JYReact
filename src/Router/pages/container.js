import {Component} from "react";
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  // MemoryRouter as Router,
  Route,
  Link,
  Switch,
  withRouter
} from "../router";

import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import _404Page from "./_404Page";

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true};
  }
  render() {
    console.log("Product", this.props); //sy-log
    return (
      <div>
        <h3>Product</h3>
        <Link to="/">go home</Link>
      </div>
    );
  }
}

function Container() {
    return (
        <div className="App">
            <Router>
                <Link to="/">首页</Link>
                <Link to="/user">用户中心</Link>
                <Link to="/login">登录</Link>
                <Link to="/product/123">商品</Link>

                {/*Switch 独占路由： 返回第一个匹配的route或者redirect  */}
                <Switch>
                    <Route
                        path="/"
                        exact
                        children={children}
                        //component={HomePage}
                        // render={render}
                    ></Route>
                    <Route path="/user" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/product/:id" render={() => <Product />} />
                    <Route component={_404Page} />
                </Switch>
            </Router>
        </div>
    );
}

function children(props) {
    console.log("children props", props); //sy-log
  
    return <div>children</div>;
}

export default Container;