import { useRef } from "react";

class FormStore {
    constructor() {
        this.store = {};
        this.fieldEntities = []; // 存储field实例
        this.callbacks = [];
    }

    setCallbacks = newCallbacks => {
        this.callbacks = {
            ...this.callbacks,
            ...newCallbacks,
        }
    }

    getFieldValue = name => {
        return this.store[name];
    };

    getFieldsValue = () => {
        return {...this.store};
    };

    setFieldsValue = newStore => {
        // 设值
        this.store = {
            ...this.store,
            ...newStore
        }
        // 更新
        this.fieldEntities.forEach(entry => {
            Object.keys(newStore).forEach(key => {
                if (entry.props.name === key) {
                    entry.onStoreChange();
                }
            })
        })
    };

    registerFieldEntity = entry => {
        this.fieldEntities.push(entry);
        return () => {
            this.fieldEntities = this.fieldEntities.filter(item => item !== entry);
            delete this.store[entry.props.name];
        }
    }

    validte = callback => {
        let err = [];
        this.fieldEntities.forEach(field => {
            const {name, rules} = field.props;
            const rule = rules && rules[0];
            const value = this.getFieldValue(name);
            if (rule && rule.required && (value === "" || value === undefined)) {
                err.push({
                    [name]: rule.message,
                    value
                })
            }
        })
        return err;
    };

    submit = () => {
        const {onFinish, onFinishFailed} = this.callbacks;
        const err = this.validte();
        // 先校验this.store
        // 校验通过 执行onFinish
        // 校验失败 执行 onFinishFailed
        if (err.length === 0) {
          // 成功
          onFinish(this.getFieldsValue());
        } else {
          // 失败
          onFinishFailed(err, this.getFieldsValue());
        }
    };

    getForm = () => {
        return {
          getFieldValue: this.getFieldValue,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          setCallbacks: this.setCallbacks,
          registerFieldEntity: this.registerFieldEntity,
          submit: this.submit
        };
    };
}

export default function useForm(form) {
    const ref = useRef();
    if (!ref.current) {
        if (form) {
            ref.current = form
        } else {
            const store = new FormStore();
            ref.current = store.getForm();
        } 
    }
    return [ref.current]
}