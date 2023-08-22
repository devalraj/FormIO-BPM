import { FormBuilder } from "@formio/react";

const FormBuilderComp = ({ formJSON, onChange }) => {
    return (
        <FormBuilder form={formJSON} onChange={onChange} />
    );
}
export default FormBuilderComp;