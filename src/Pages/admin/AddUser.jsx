import { useNavigate } from "react-router-dom";
import FormComponent from "../../components/FormComponent";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";

export default function AddUserPage() {
    const nav = useNavigate();
    const [formdata, setFormData] = useState({});
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get('/get/addUser');
                if (res.data.Output) {
                    setFormData(JSON.parse(res.data.Output));
                }
            }
            catch (er) {
                console.log(er.message);
            }
        }
        StartUp();
    }, []);
    async function handleSubmit(data) {
        // e.preventDefault();
        try {
            const res = await axiosPrivate.post('/signup',
                { Email: data.data.email, Name: data.data.name, Password: data.data.password, DOB: data.data.dob, Age: String(data.data.age), Role: data.data.privileges },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (res.status === 200) {
                nav('/admin');
            }
            else {
                console.log('Invalid details');
            }
        }
        catch (er) {
            console.log(er.message);
        }
    }
    return (
        <div>
            <FormComponent form={formdata} handleSubmit={handleSubmit} />
        </div>
    );
}