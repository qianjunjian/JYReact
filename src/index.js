// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// // import store from "./ReactRedux/store/index";
// // import { Provider } from "./ReactRedux/react-redux/index";
// import store from "./saga/store";
// import {Provider} from "react-redux";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import ReactDOM from "./min4React/react-dom";
import Component from "./min4React/Component";
import { useState } from "./min4React/hooks";

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {

  const [count, setCount] = useState(0);

  return (
    <div className="border">
      <p>{props.name}</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        click
      </button>
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.baidu.com/">123</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
