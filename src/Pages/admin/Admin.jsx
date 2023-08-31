import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import '../../styles/admin.css'

export default function AdminPage() {
    const [forms, setForms] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        const StartUp = async () => {
            try {
                const res = await axiosPrivate.get('/getall');
                if (res.data.Output) {
                    setForms(res.data.Output);
                }
            }
            catch (er) {
                console.log(er.message);
            }
        }
        StartUp();
    }, []);
    const handleDelete = async (formName) => {
        try {
            const res = await axiosPrivate.delete(`/delete/${formName}`);
        }
        catch (er) {
            console.log(er.message);
        }
    };
    return (
        <div>
            <div className="MainForm">
                <div className="Forms">
                    <Link to="/addUser">Create New User</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/PolicyDetails">Search Policy</Link>
                    <div className="FormData">
                        <h1>Forms</h1>
                        <table>
                            <tbody>
                                {forms.map((form, idx) =>
                                    <tr key={idx}>
                                        <td><Link to={`/form/${form.Name}`}>{form.Name}</Link></td>
                                        {/* <td>del</td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button className="newForm" onClick={() => { nav('/formBuild'); }}>New Form</button>
                    </div>
                </div>
            </div>

        </div >
    );
};