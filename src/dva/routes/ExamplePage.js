import React, { Component } from "react";
import { connect } from "dva";
import { Table } from "antd";

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "住址",
    dataIndex: "city",
    key: "city"
  }
];
// @connect(({ example }) => ({ example }), {
@connect(
  state => {
    console.log(" example state", state); //sy-log
    return { example: state.example, user: state.user };
  },
  {
    getProductData: payload => ({ type: "example/getProductData", payload })
  }
)
class ExamplePage extends Component {
  dataSearch = () => {
    // 异步获取数据
    this.props.getProductData();
  };
  render() {
    console.log("example props", this.props); //sy-log
    const { data } = this.props.example;
    return (
      <div>
        <h3>ExamplePage</h3>
        <button onClick={this.dataSearch}>search</button>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    );
  }
}
export default ExamplePage;