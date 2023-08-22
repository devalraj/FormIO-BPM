import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import Loading from "../components/Loading";
import FormComponent from "../components/FormComponent";

export default function InsurancePage() {
    const nav = useNavigate();
    const [formdata, setFormData] = useState(undefined);
    const location = useLocation();
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get(`/get/${location.state}Insurance`);
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
        console.log(data.data);
        // try {
        //     const res = await axiosPrivate.post('/insurance',
        //         { ...data.data },
        //         {
        //             headers: {
        //                 "Content-Type": "application/json"
        //             }
        //         });
        //     if (res.status === 200) {
        //             nav('/home');
        //     }
        // }
        // catch (er) {
        //     console.log(er.message);
        // }
    }
    async function handleNext(data)
    {
        console.log(data);
    }
    return (
        (formdata) ?
            <FormComponent form={formdata} handleSubmit={handleSubmit} /> :
            <Loading />
    );
}