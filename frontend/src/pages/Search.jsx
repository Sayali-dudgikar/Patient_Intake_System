import { useEffect, useState } from "react";
import api from "../services/api";

function Search() {

    const [patients, setPatients] = useState([]);

    const [name, setName] = useState("");

    const [urgency, setUrgency] = useState("");

    const [date, setDate] = useState("");

   const fetchPatients = async () => {

    const params = {};

    if (name.trim() !== "") {
        params.name = name;
    }

    if (urgency !== "") {
        params.urgency = urgency;
    }

    if (date !== "") {
        params.search_date = date;
    }

    try {

        const response = await api.get("/patients", {
            params,
        });

        setPatients(response.data);

    } catch (error) {

        console.log(error);

    }

};

    
    const deletePatient = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/patients/${id}`);

            fetchPatients();

        }

        catch (error) {

            alert("Failed to delete patient.");

            console.log(error);

        }

    };

    useEffect(() => {

        fetchPatients();

    }, []);

    return (

        <div className="search-box">

            <h2>Search Patients</h2>

            <input
                type="text"
                placeholder="Search by Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
            >

                <option value="">All Urgency</option>

                <option>Routine</option>

                <option>Priority</option>

                <option>Urgent</option>

            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button onClick={fetchPatients}>
                Search
            </button>

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Age</th>

                        <th>Urgency</th>

                        <th>Department</th>

                        <th>Registration Date</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {patients.map((patient) => (

                        <tr key={patient.id}>

                            <td>{patient.name}</td>

                            <td>{patient.age}</td>

                            <td>{patient.final_urgency}</td>

                            <td>{patient.final_department}</td>

                            <td>

                                {new Date(patient.created_at).toLocaleDateString("en-IN")}

                            </td>

                            <td>

                                <button
                                    className="delete-btn"
                                    onClick={() => deletePatient(patient.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Search;