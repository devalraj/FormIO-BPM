import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FormComponent from "../components/FormComponent";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import Loading from "../components/Loading";

export default function HomePage() {
    const { auth } = useAuth();
    const [formdata, setFormData] = useState(undefined);
    const nav = useNavigate();
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get('/get/welcome');
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
    const handleSubmit = (data) => {
        nav('/insurance', { state: data.data.selectInsuranceType });
    };
    return (
        <div>
            <Link to="/details">edit Details</Link>
            <h1>Hello {auth.name}</h1>
            {(formdata) ?
                <FormComponent className="form" form={formdata} handleSubmit={handleSubmit} /> :
                <Loading />}
        </div>
    );
}