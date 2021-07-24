import { forwardRef } from "react";
import _Form from "./form";
import Field from "./field";
import useForm from "./useForm";

const Form = forwardRef(_Form);
Form.Field = Field;
Form.useForm = useForm;

export {Field, useForm};
export default Form;
