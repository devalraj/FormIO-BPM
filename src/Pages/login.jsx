import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import '../styles/login.css'
const URL = (import.meta.env.VITE_FIURL) ? import.meta.env.VITE_FIURL : '';

function LoginPage() {
    const nav = useNavigate();
    const { setAuth } = useAuth();
    const [formdata, setFormData] = useState(undefined);
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get('/get/login');
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
            const res = await axiosPrivate.post('/login',
                { email: data.data.email, password: data.data.password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (res.status === 200 && res.data.Output === 'Success') {
                setAuth({ email: data.data.email, name: res.data.Name, role: res.data.role });
                if (res.data.role === 'admin') {
                    nav('/admin');
                }
                else {
                    nav('/home');
                }
            }
            else {
                console.log('Invalid Login Cridentials');
            }
        }
        catch (er) {
            console.log(er.message);
        }
    }
    return (
        (formdata) ?
            <div className="LoginContainer">
                <div className="Login">
                    <FormComponent form={formdata} handleSubmit={handleSubmit} />
                </div>
            </div> :
            <Loading />
    );
}

export default LoginPage;