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


import ReactDOM from "./minReact/react-dom";
import Component from "./minReact/Component";

function FunctionComponent({name}) {
  return (
    <div className="border">
      <p>{name}</p>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FragmentComponent(props) {
  return (
    <>
      <h1>111</h1>
      <h1>222</h1>
    </>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.baidu.com/">123</a>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
    <FragmentComponent />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
