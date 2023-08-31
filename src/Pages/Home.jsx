import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FormComponent from "../components/FormComponent";
import { useEffect, useState } from "react";
import axios, { axiosPrivate } from "../api/axios";
import Loading from "../components/Loading";
import { v4 as uuid } from 'uuid';
import '../styles/home.css'

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

    function handleSubmit(data) {
        let uid = uuid();
        try {
            axiosPrivate.post("/policy", {
                "UUID": uid,
                "Email": auth.email,
                "Name": auth.name,
                "Policy": data.data.selectInsuranceType,
                "Status": "Pending"
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        const res = await axios.post("/initiate", {
                            "Initiate_BPM": {
                                "ID": uid,
                                "Start": "true"
                            }
                        });
                        if (res.status === 200 && res.data.receivedDocument.Data) {
                            nav('/insurance', { state: { ID: uid, PolicyName: data.data.selectInsuranceType, formN: res.data.receivedDocument.Name, formD: JSON.parse(res.data.receivedDocument.Data) } });
                        }
                    }
                })
                .catch((er) => {
                    console.log(er.message);
                });

        }
        catch (er) {
            console.log(er.message);
        }
    }
    return (
        <div className="mainDiv">

            <div className="home">
                <div>
                    {/* <Link to="/details">Edit Details</Link>
                    <br/> */}
                    <Link to="/Policy">Search Policy</Link>
                </div>
                <br />
                <h1>Hello {auth.name}</h1>
                {(formdata) ?
                    <FormComponent className="form" form={formdata} handleSubmit={handleSubmit} /> :
                    <Loading />}
            </div>
        </div>
    );
}