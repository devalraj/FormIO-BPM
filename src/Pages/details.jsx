import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function DetailsPage() {
    const nav = useNavigate();
    const [formdata, setFormData] = useState(undefined);
    const { auth } = useAuth();
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get(`/details/${auth.email}`);
                let FData = JSON.parse(res.data.Data);
                FData.components.forEach((form) => {
                    if (res.data[form.label] !== undefined) {
                        form.defaultValue = res.data[form.label];
                    }
                });
                if (res.data) {
                    setFormData(FData);
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
            const res = await axiosPrivate.put('/update/details',
                { Email: auth.email, Name: data.data.name, DOB: data.data.dateTime, Age: data.data.age },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (res.status === 200) {
                nav('/home');
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
            {(formdata) ?
                <FormComponent form={formdata} handleSubmit={handleSubmit} /> :
                <Loading />
            }
        </div>
    );
}