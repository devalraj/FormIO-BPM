import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import FormBuilderComp from "../../components/FormBuilderComponent";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "../../styles/formBuilder.css"

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
                <div className="mainForm">
                    <div className="TopView">
                        {/* <label className="FormName">Form Name</label> */}
                        <input required type="text" placeholder="Enter form name" value={formName} onChange={(e) => setFormName(e.target.value)} />
                        <button className="btn1" disabled={formData.display === 'form'} onClick={() => setFormData({ ...formData, display: "form" })}>form</button>
                        <button className="btn1" disabled={formData.display === 'wizard'} onClick={() => setFormData({ ...formData, display: "wizard" })}>wizard</button>
                    </div>
                    <div className="formContainer2">
                        <FormBuilderComp formJSON={formData} onChange={(data) => { setFormData(data) }} />
                    </div>
                    <div className="btndiv">
                        <button className="btn2" onClick={() => setToggle(!toggle)}>display Form</button>
                        <button className="btn2" onClick={(Update !== undefined && Update === true) ? handleUpdate : handleSave}>{(Update !== undefined && Update === true) ? 'Update' : 'Save'}</button>
                    </div>
                </div>
            ) :
                (
                    <div className="mainForm">
                        <div className="formBuilder">
                            <div className="formContainer">
                                <FormComponent form={formData} />
                            </div>
                        </div>
                        <div className="btndiv">
                            <button className="btn1" onClick={() => setToggle(!toggle)}>Display Form Builder</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}