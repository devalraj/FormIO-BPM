import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../api/axios";
import Loading from "../components/Loading";
import FormComponent from "../components/FormComponent";
import { ToastContainer, toast } from 'react-toastify';

const docs = ["PartyInfoDoc", "MopedInfoDoc", "CoveragesDoc", "AcceptanceDoc", "SummaryDoc", "ConfirmationDoc"];
const FORMS = ["Party Info", "Vehicle Info", "Coverage", "Acceptance", "Summary", "Confirmation"];
const coverages = {
    ".21": "Basic Coverages",
    ".61": "Third-Party Liability Only Cover",
    ".23": "Collision Damage or Own Damage (OD) Cover",
    ".52": "Road side assistance"
}

export default function InsurancePage() {
    const nav = useNavigate();
    const formNO = useRef(1);
    const [formName, setFormName] = useState('');
    const formValues = useRef({});
    const formdata = useRef(undefined);
    const location = useLocation();
    const Uid = useRef('');
    const PolicyName = useRef('');

    useEffect(() => {
        if (location.state.formD) {
            Uid.current = location.state.ID;
            setFormName(location.state.formN);
            formdata.current = location.state.formD;
            PolicyName.current = location.state.PolicyName;
        }
    }, []);

    useEffect(() => {
        if (FORMS.includes(formName))
            formNO.current = FORMS.indexOf(formName) + 1;
    }, [formName])

    function formatDate(inputDate) {
        const inputDateFormat = 'YYYY-MM-DDTHH:mm:ssZ'; // Input date format
        const outputDateFormat = 'DD/MM/YYYY'; // Desired output date format
        // Parse input date
        const dateParts = inputDate.split(/[-T:]/);
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        // Format parsed date into the desired output format
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }

    function calculateAgeFromBirthdate(birthdate) {
        const today = new Date();
        const birthdateParts = birthdate.split('/');
        const birthYear = parseInt(birthdateParts[2], 10);
        const birthMonth = parseInt(birthdateParts[1], 10) - 1; // Months are zero-based
        const birthDay = parseInt(birthdateParts[0], 10);
        const age = today.getFullYear() - birthYear;
        // Adjust age if birthdate hasn't occurred yet this year
        if (
            today.getMonth() < birthMonth ||
            (today.getMonth() === birthMonth && today.getDate() < birthDay)
        ) {
            return age - 1;
        }
        return age;
    }

    // console.log(Uid.current);

    async function handleSubmit(data) {
        let path = `/form${formNO.current}`;
        let req = {};
        switch (formNO.current) {
            case 1:
                let DOB = calculateAgeFromBirthdate(formatDate(data.data.dateOfBirth));
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Name": data.data.name,
                        "Email": data.data.email,
                        "DOB": DOB.toString(),
                        "PostCode": data.data.postCode,
                        "HNO": data.data.hno.toString(),
                        "Street": data.data.street,
                        "City": data.data.city,
                        "PhoneNo": data.data.phoneNumber
                    }
                }
                break;
            case 2:
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Prev": (data.data.prev) ? "true" : "false",
                        "Licence": data.data.licence,
                        "Brand": data.data.brand,
                        "Type": data.data.type,
                        "Price": data.data.price.toString()
                    }
                }
                break;
            case 3:
                let selected = [];
                for (let key in data.data.selectedCoverages) {
                    if (data.data.selectedCoverages.hasOwnProperty(key) && data.data.selectedCoverages[key] === true)
                        selected.push(coverages[key]);
                }
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Prev": (data.data.prev) ? "true" : "false",
                        "Selected": selected
                    }
                }
                break;
            case 4:
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Prev": (data.data.previous) ? "true" : "false",
                        "PMethod": data.data.pMethod
                    }
                }
                break;
            case 5:
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Prev": (data.data.previous) ? "true" : "false"
                    }
                }
                break;
            case 6:
                path = '/submit';
                req = {
                    [docs[formNO.current - 1]]: {
                        "ID": Uid.current,
                        "Prev": (data.data.previous) ? "true" : "false"
                    }
                }
                break;
            default:
                break;
        }
        // console.log(path, req);
        try {
            const res = await axios.post(path, req);
            // console.log(res);
            if (res.status === 200 && res.data.receivedDocument) {
                if (res.data.receivedDocument.Name === 'SUCCESS' || res.data.receivedDocument.Name === 'ERROR') {
                    // Save to database
                    if (res.data.receivedDocument.Name === 'SUCCESS') {
                        axiosPrivate.put(`/updatePolicy/${Uid.current}`)
                            // .then(() => { })
                            .catch((er) => {
                                console.log(er.message)
                            });
                    }
                    else {
                        axiosPrivate.delete(`/deletePolicy/${Uid.current}`)
                            // .then(() => { })
                            .catch((er) => {
                                console.log(er.message)
                            });
                    }
                    nav('/Confirmationpage', { state: { Status: res.data.receivedDocument.Name, UID: Uid.current, PolicyName: PolicyName.current } });
                }
                else {
                    let FData = JSON.parse(res.data.receivedDocument.Data);
                    if (FData?.components) {
                        FData.components.forEach((form) => {
                            if (formValues.current[form.key]) {
                                form.defaultValue = formValues.current[form.key];
                            }
                        });
                    }
                    setFormName(res.data.receivedDocument.Name);
                    formdata.current = FData;
                    formValues.current = { ...formValues.current, ...data.data };
                    location.state.formN = res.data.receivedDocument.Name;
                    location.state.formD = FData;
                }
            }
        }
        catch (er) {
            console.log(er.message);
        }
    }

    async function handleCustomEvent(data) {
        if (data.type === "previous") {
            let path = `/form${formNO.current}`;
            let req = {};
            switch (formNO.current) {
                case 2:
                    req = {
                        [docs[formNO.current - 1]]: {
                            "ID": Uid.current,
                            "Prev": "true",
                            "Licence": "NA",
                            "Brand": "NA",
                            "Type": "NA",
                            "Price": "NA"
                        }
                    }
                    break;
                case 3:
                    req = {
                        [docs[formNO.current - 1]]: {
                            "ID": Uid.current,
                            "Prev": "true",
                            "Selected": ["NA"]
                        }
                    }
                    break;
                case 4:
                    req = {
                        [docs[formNO.current - 1]]: {
                            "ID": Uid.current,
                            "Prev": "true",
                            "PMethod": "NA"
                        }
                    }
                    break;
                case 5:
                    req = {
                        [docs[formNO.current - 1]]: {
                            "ID": Uid.current,
                            "Prev": "true"
                        }
                    }
                    break;
                case 6:
                    path = '/submit';
                    req = {
                        [docs[formNO.current - 1]]: {
                            "ID": Uid.current,
                            "Prev": "true"
                        }
                    }
                    break;
                default:
                    break;
            }
            // console.log(path, req);
            try {
                const res = await axios.post(path, req);
                // console.log(res);
                if (res.status === 200 && res.data.receivedDocument) {
                    let FData = JSON.parse(res.data.receivedDocument.Data);
                    if (FData?.components) {
                        FData.components.forEach((form) => {
                            if (formValues.current[form.key]) {
                                form.defaultValue = formValues.current[form.key];
                            }
                        });
                    }
                    setFormName(res.data.receivedDocument.Name);
                    formdata.current = FData;
                    formValues.current = { ...formValues.current, ...data.data };
                    location.state.formN = res.data.receivedDocument.Name;
                    location.state.formD = FData;
                }
            }
            catch (er) {
                console.log(er.message);
            }
        }
    }

    return (
        <div className="mainDiv">
            <h1>{formName}</h1>
            <div className="home">
                {(formdata.current) ?
                    <FormComponent form={formdata.current} handleSubmit={handleSubmit} handleCustomEvent={handleCustomEvent} /> :
                    <Loading />}
            </div>
        </div>
    );
}