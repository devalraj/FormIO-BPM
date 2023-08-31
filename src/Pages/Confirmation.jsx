import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../styles/Confirmation.css'

export default function PolicyDetails() {
    const location = useLocation();
    const [policyID, setPolicyID] = useState('');
    const [policyName, setPolicyName] = useState('');
    const [Status, setStatus] = useState('');
    const { auth } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        if (location.state?.UID) {
            setPolicyID(location.state?.UID);
            setPolicyName(location.state?.PolicyName);
            setStatus(location.state?.Status);
        }
    }, []);

    return (
        <div className="policy-div">
            <div className="policy-form">
                {(Status === 'SUCCESS') ?
                    <div className="policy-form2">
                        <div>
                            <h1>Thank you for the applying</h1>
                            <h2>{auth.name}</h2>
                        </div>
                        <br />
                        <div>
                            <h1>Here is your Policy Details </h1>
                            <h2>ID: {policyID}</h2>
                            <h2>Name: {policyName}</h2>
                        </div>

                    </div> :
                    <div className="policy-form2">
                        <h1>We're sorry, but you must be at least 18 years old to apply for insurance with us. If you have any questions, please contact our customer support.</h1>
                    </div>
                }
                <button className="submit" onClick={() => { nav('/home') }}>Home</button>
            </div>
        </div>
    );
};