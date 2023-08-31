import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import '../../styles/policy.css';

export default function PolicyDetails() {
    const [policies, setPolicies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const res = await axiosPrivate.get('/getPolicyDetails');
                if (res.data.Output) {
                    setPolicies(res.data.Output);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPolicies();
    }, []);

    const filteredPolicies = policies.filter(policy =>
        policy.UUID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="PolicyForm">
                <div className="PolicyDataForms">

                    <div className="SearchBar">
                        <h1>Policy Details</h1>
                        <input
                            type="text"
                            placeholder="Search by UUID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* <div className="FormData"> */}
                    <table>
                        <thead>
                            <tr>
                                <th>UUID</th>
                                <th>Email</th>
                                <th>PolicyID</th>
                                <th>Policy Name</th>
                                <th>Policy Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPolicies.map((policy, idx) => (
                                <tr key={idx}>
                                    <td>{policy.UUID}</td>
                                    <td>{policy.email}</td>
                                    <td>{policy.policyID}</td>
                                    <td>{policy.policyName}</td>
                                    <td>{policy.policyStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
