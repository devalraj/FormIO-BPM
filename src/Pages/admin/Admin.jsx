import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

export default function AdminPage() {
    const [forms, setForms] = useState([]);
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
            <Link to="/addUser">Create New User</Link>
            <div className="Forms">
                Forms
                <table>
                    <tbody>
                        {forms.map((form, idx) =>
                            <tr key={idx}>
                                <td><Link to={`/form/${form.Name}`}>{form.Name}</Link></td>
                                <td>del</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Link to='/formBuild'>New Form</Link>
            </div>
        </div >
    );
};