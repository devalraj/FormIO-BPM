import { useState } from "react";
import { axiosPrivate } from "../api/axios";
import '../styles/policy.css';
export default function UserPolicyDetailsPage() {
    const [policy, setPolicy] = useState('');
    const [policyDetails, setPolicyDetails] = useState([]);

    async function handleSearch(e) {
        e.preventDefault();
        if (policy !== '') {
            try {
                const res = await axiosPrivate.get(`/getPolicyByEmailOrID/${policy}`);
                if (res.data.Output) {
                    setPolicyDetails(res.data.Output);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div>
            <div className="PolicyForm">
                <div className="PolicyDataForms">
                    <h1>Policy Details</h1>
                    <div className="SearchBar">
                        <input type="text" placeholder="Search Policy" value={policy} onChange={(e) => setPolicy(e.target.value)} />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="FormData">

                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Policy ID</th>
                                    <th>Email</th>
                                    <th>Policy Name</th>
                                    <th>Policy Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policyDetails.map((policyDetail, idx) => (
                                    <tr key={idx}>
                                        <td>{policyDetail.UUID}</td>
                                        <td>{policyDetail.email}</td>
                                        <td>{policyDetail.policyName}</td>
                                        <td>{policyDetail.policyStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
