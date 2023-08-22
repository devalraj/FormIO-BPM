import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import FormBuilderComp from "../../components/FormBuilderComponent";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function FormBuildingPage({ Update, Data, formname }) {
    const nav = useNavigate();
    let data = (Data) ? Data : { display: 'form' };
    let name = (formname) ? formname : '';
    const [toggle, setToggle] = useState(true);
    const [formName, setFormName] = useState(name);
    const [formData, setFormData] = useState(data);
    const handleSave = async () => {
        if (formName !== '' && (formData.components && formData.components.length > 0)) {
            try {
                const res = await axiosPrivate.post('/save',
                    { Data: { Name: formName, Data: JSON.stringify(formData) } },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                if (res.status === 200) {
                    nav('/admin');
                }
                else {
                    console.log('Invalid Data');
                }
            }
            catch (er) {
                console.log(er.message);
            }
        }
    };
    const handleUpdate = async () => {
        console.log()
        try {
            const res = await axiosPrivate.put('/update',
                { Data: { Name: formName, Data: JSON.stringify(formData) } });
            if (res.status === 200) {
                nav('/admin');
            }
        }
        catch (er) {
            console.log(er.message);
        }
    };
    return (
        <div>
            {toggle ? (
                <div>
                    <label>Form Name</label>
                    <input required type="text" value={formName} onChange={(e) => setFormName(e.target.value)} />
                    <button disabled={formData.display === 'form'} onClick={() => setFormData({ ...formData, display: "form" })}>form</button>
                    <button disabled={formData.display === 'wizard'} onClick={() => setFormData({ ...formData, display: "wizard" })}>wizard</button>
                    <FormBuilderComp formJSON={formData} onChange={(data) => { setFormData(data) }} />
                    <button onClick={() => setToggle(!toggle)}>display Form</button>
                    <button onClick={(Update !== undefined && Update === true) ? handleUpdate : handleSave}>{(Update !== undefined && Update === true) ? 'Update' : 'Save'}</button>
                </div>
            ) :
                (
                    <div>
                        <FormComponent form={formData} />
                        <button onClick={() => setToggle(!toggle)}>display Form builder</button>
                    </div>
                )
            }
        </div>
    );
}