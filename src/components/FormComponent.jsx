import { Form } from "@formio/react";

const FormComponent = ({ srcURL, form, handleSubmit, handleNext, handleCustomEvent }) => {
    return (<Form src={srcURL} form={form} onSubmit={handleSubmit} onNextPage={handleNext} onCustomEvent={handleCustomEvent} />);
};

export default FormComponent;