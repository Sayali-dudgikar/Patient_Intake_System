import { useState } from "react";
import api from "../services/api";

function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    symptoms: "",
    ai_urgency: "",
    ai_department: "",
    final_urgency: "",
    final_department: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkSymptoms = async () => {
    if (!formData.symptoms) {
      alert("Please enter symptoms first.");
      return;
    }

    try {
      const response = await api.post("/analyze-symptoms", {
        symptoms: formData.symptoms,
      });
      console.log(response.data);

      setFormData((prev) => ({
        ...prev,
        ai_urgency: response.data.urgency,
        ai_department: response.data.department,
        final_urgency: response.data.urgency,
        final_department: response.data.department,
      }));
    } catch (error) {
      alert("Error analyzing symptoms.");
      console.error(error);
    }
  };

  const savePatient = async () => {
    if(formData.contact.length !== 10){

    alert("Contact number must contain exactly 10 digits.");

    return;

}
    try {
      await api.post("/patients", formData);

      alert("Patient Registered Successfully!");

      setFormData({
        name: "",
        age: "",
        gender: "",
        contact: "",
        symptoms: "",
        ai_urgency: "",
        ai_department: "",
        final_urgency: "",
        final_department: ""
      });

    } catch (error) {
      alert("Failed to save patient.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Patient Registration</h2>

      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
        <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            maxLength={10}
            onChange={(e) => {

                const value = e.target.value;

                if (/^\d*$/.test(value)) {

                    setFormData({
                        ...formData,
                        contact: value
                    });

                }

            }}
        />

        {
            formData.contact &&
            formData.contact.length < 10 &&
            (
                <p className="error">
                    Contact number must be exactly 10 digits.
                </p>
            )
        }
      <textarea
        name="symptoms"
        placeholder="Enter Symptoms"
        rows="4"
        value={formData.symptoms}
        onChange={handleChange}
      />

      <button onClick={checkSymptoms}>
        Check Symptoms
      </button>

      <br /><br />

      <label>AI Suggested Urgency</label>

      <select
        name="final_urgency"
        value={formData.final_urgency}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option>Routine</option>
        <option>Priority</option>
        <option>Urgent</option>
      </select>

      <label>Department</label>

     <select
    name="final_department"
    value={formData.final_department}
    onChange={handleChange}
>

    <option value="">Select Department</option>

    <option>General Medicine</option>

    <option>Cardiology</option>

    <option>Neurology</option>

    <option>Orthopedics</option>

    <option>Dermatology</option>

    <option>Pediatrics</option>

    <option>ENT</option>

    <option>Pulmonology</option>

    <option>Emergency</option>

</select>

      <br />

      <button onClick={savePatient}>
        Register Patient
      </button>
    </div>
  );
}

export default PatientForm;