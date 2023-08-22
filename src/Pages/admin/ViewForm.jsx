import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import FormBuildingPage from "./FormBuilding";
import Loading from "../../components/Loading";

export default function ViewFormPage() {
    const params = useParams();
    const formName = useRef(params.name);
    const [formdata, setFormData] = useState(undefined);
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get(`/get/${formName.current}`);
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
    return (
        (formdata) ?
            <FormBuildingPage Update={true} formname={formName.current} Data={formdata} /> :
            <Loading />
    );
}