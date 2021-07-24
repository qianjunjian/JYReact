import { Component, cloneElement } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {

    static contextType = FieldContext;

    componentDidMount() {
        this.unregisterFieldEntity = this.context.registerFieldEntity(this);
    }

    componentWillUnmount() {
        if (this.unregisterFieldEntity) {
          this.unregisterFieldEntity();
        }
    }

    getControlled = () => {
        const {getFieldValue, setFieldsValue} = this.context;
        const { name } = this.props;
        return {
            value: getFieldValue(name),   // 获取值
            onChange: e => {
                const newValue = e.target.value;
                // 设置值并更新
                setFieldsValue({
                    [name]: newValue
                })
            }
        }
    }

    onStoreChange = () => {
        this.forceUpdate();
    };

    render() {
        const { children } = this.props;
        const returnChildNode = cloneElement(children, this.getControlled());
        return returnChildNode;
    }
}