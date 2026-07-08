import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            setData(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!data) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="container">

            <h1>Dashboard</h1>

            <div className="cards">

                <div className="card">

                    <h3>Total Patients</h3>

                    <h2>{data.total_patients}</h2>

                </div>

                <div className="card">

                    <h3>Today's Registrations</h3>

                    <h2>{data.today_total}</h2>

                </div>

                <div className="card">

                    <h3>Routine</h3>

                    <h2>{data.urgency?.Routine || 0}</h2>

                </div>

                <div className="card">

                    <h3>Priority</h3>

                    <h2>{data.urgency?.Priority || 0}</h2>

                </div>

                <div className="card">

                    <h3>Urgent</h3>

                    <h2>{data.urgency?.Urgent || 0}</h2>

                </div>

            </div>

            <br />

            <h2>Department Breakdown</h2>

            <table>

                <thead>

                    <tr>

                        <th>Department</th>

                        <th>Patients</th>

                    </tr>

                </thead>

                <tbody>

                    {Object.entries(data.department || {}).map(([dept, count]) => (

                        <tr key={dept}>

                            <td>{dept}</td>

                            <td>{count}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Dashboard;