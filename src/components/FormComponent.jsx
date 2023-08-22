import { Form } from "@formio/react";

const FormComponent = ({ srcURL, form, handleSubmit, handleNext }) => {
    return (<Form src={srcURL} form={form} onSubmit={handleSubmit} onNextPage={handleNext} />);
};

export default FormComponent;