import {Component, useEffect, createRef } from "react";
import Form, { Field } from "../component/index";
import Input from "../component/input";

const nameRules = {required: true, message: "请输入姓名！"};
const passworRules = {required: true, message: "请输入密码！"};

export default function MyRCFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };

  // didmount
  useEffect(() => {
    console.log("form", form); //sy-log
    form.setFieldsValue({username: "default"});
  }, []);

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]} >
          <Input placeholder="username" />
        </Field>
        <Field name="password"  rules={[passworRules]}>
          <Input placeholder="password"/>
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}


// export default class MyRCFieldForm extends Component {
//   formRef = createRef();
//   componentDidMount() {
//     console.log("form", this.formRef.current); //sy-log
//     this.formRef.current.setFieldsValue({username: "default"});
//   }

//   onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };

//   // 表单校验失败执行
//   onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sy-log
//   };
//   render() {
//     return (
//       <div>
//         <h3>MyRCFieldForm</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <Field name="username" rules={[nameRules]}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <Input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }