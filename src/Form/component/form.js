import { useImperativeHandle } from "react";
import useForm from "./useForm";
import FieldContext from "./FieldContext";

export default function Form({children, form, onFinish, onFinishFailed}, ref) {
    const [ formInstance ] = useForm(form)

    useImperativeHandle(ref, () => formInstance);

    formInstance.setCallbacks({onFinish, onFinishFailed});

    return <FieldContext.Provider value={formInstance}>
         <form
            onSubmit={e => {
                // 提交
                e.preventDefault();
                formInstance.submit();
            }}>
            {children}
        </form>
    </FieldContext.Provider>
}