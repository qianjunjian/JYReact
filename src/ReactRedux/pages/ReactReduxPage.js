import React, {Component} from "react";
import {bindActionCreators, connect} from "../react-redux";

@connect(
    // mapStateToProps 把state map（映射） props上一份
    ({count}) => ({count}),
  
    // mapDispatchToProps object | function
    {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"}),
    }
    // (dispatch) => {
    //   let creators = {
    //     add: () => ({type: "ADD"}),
    //     minus: () => ({type: "MINUS"}),
    //   };
  
    //   creators = bindActionCreators(creators, dispatch);
  
    //   return {dispatch, ...creators};
    // }
)
class ReactReduxPage extends Component {
    render() {
        console.log("props", this.props); //sy-log
        const {count, dispatch, add, minus} = this.props;
        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{count}</p>
                <button onClick={() => dispatch({type: "ADD", payload: 100})}>
                dispatch add
                </button>

                <button onClick={add}> add </button>
                <button onClick={minus}> minus </button>
            </div>
        );
    }
}
export default ReactReduxPage;