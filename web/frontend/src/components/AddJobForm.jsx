import { useState } from "react";
import {
  createJob
} from "../services/job.services.js";

const AddJobForm = () => {

  const [formData, setFormData] = useState({

    company: "",
    role: "",
    interviewDate: "",
    notes: "",

    rounds: [
      {
        title: "",
        status: "Upcoming",
        scheduledAt: "",
        feedback: ""
      }
    ]
  });

  // ===============================
  // INPUT STYLES
  // ===============================

  const inputStyle = {

    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "6px",
    display: "block"
  };

  // ===============================
  // HANDLE MAIN FORM INPUTS
  // ===============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ===============================
  // ADD NEW ROUND
  // ===============================

  const addRound = () => {

    setFormData({

      ...formData,

      rounds: [

        ...formData.rounds,

        {
          title: "",
          status: "Upcoming",
          scheduledAt: "",
          feedback: ""
        }
      ]
    });
  };

  // ===============================
  // HANDLE ROUND CHANGES
  // ===============================

  const handleRoundChange = (
    index,
    field,
    value
  ) => {

    const updatedRounds =
      [...formData.rounds];

    updatedRounds[index][field] =
      value;

    setFormData({
      ...formData,
      rounds: updatedRounds
    });
  };

  // ===============================
  // SUBMIT FORM
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await createJob(formData);

      console.log(data);

      alert("Job Added Successfully");

      setFormData({
        company: "",
        role: "",
        interviewDate: "",
        notes: "",
        rounds: [
          {
            title: "",
            status: "Upcoming",
            scheduledAt: "",
            feedback: ""
          }
        ]
      });

    } catch (error) {

      console.log(error);

      alert("Failed To Add Job");
    }
  };

  return (

    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}
    >

      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}

      <h2
        style={{
          marginBottom: "25px",
          color: "#222"
        }}
      >
        Add New Job
      </h2>

      {/* ===================== */}
      {/* FORM */}
      {/* ===================== */}

      <form onSubmit={handleSubmit}>

        {/* COMPANY */}

        <label style={labelStyle}>
          Company
        </label>

        <input
          type="text"
          name="company"
          placeholder="Google"
          value={formData.company}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* ROLE */}

        <label style={labelStyle}>
          Role
        </label>

        <input
          type="text"
          name="role"
          placeholder="SDE Intern"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* INTERVIEW DATE */}

        <label style={labelStyle}>
          Main Interview Date
        </label>

        <input
          type="datetime-local"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* NOTES */}

        <label style={labelStyle}>
          Notes
        </label>

        <textarea
          name="notes"
          placeholder="Add important notes..."
          value={formData.notes}
          onChange={handleChange}
          style={{
            ...inputStyle,
            minHeight: "100px"
          }}
        />

        {/* ===================== */}
        {/* INTERVIEW ROUNDS */}
        {/* ===================== */}

        <h3
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            color: "#333"
          }}
        >
          Interview Rounds
        </h3>

        {
          formData.rounds.map(
            (round, index) => (

              <div
                key={index}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                  backgroundColor: "#f9fafb"
                }}
              >

                <h4
                  style={{
                    marginBottom: "15px"
                  }}
                >
                  Round {index + 1}
                </h4>

                {/* ROUND TITLE */}

                <label style={labelStyle}>
                  Round Title
                </label>

                <input
                  type="text"
                  placeholder="Technical Round"
                  value={round.title}
                  onChange={(e) =>
                    handleRoundChange(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* ROUND STATUS */}

                <label style={labelStyle}>
                  Round Status
                </label>

                <select
                  value={round.status}
                  onChange={(e) =>
                    handleRoundChange(
                      index,
                      "status",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                >

                  <option>
                    Upcoming
                  </option>

                  <option>
                    Ongoing
                  </option>

                  <option>
                    Completed
                  </option>

                </select>

                {/* ROUND DATE */}

                <label style={labelStyle}>
                  Scheduled Date
                </label>

                <input
                  type="datetime-local"
                  value={round.scheduledAt}
                  onChange={(e) =>
                    handleRoundChange(
                      index,
                      "scheduledAt",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* FEEDBACK */}

                <label style={labelStyle}>
                  Feedback
                </label>

                <textarea
                  placeholder="Round feedback..."
                  value={round.feedback}
                  onChange={(e) =>
                    handleRoundChange(
                      index,
                      "feedback",
                      e.target.value
                    )
                  }
                  style={{
                    ...inputStyle,
                    minHeight: "80px"
                  }}
                />

              </div>
            )
          )
        }

        {/* ===================== */}
        {/* ADD ROUND BUTTON */}
        {/* ===================== */}

        <button
          type="button"
          onClick={addRound}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "20px",
            fontWeight: "600"
          }}
        >
          + Add Round
        </button>

        <br />

        {/* ===================== */}
        {/* SUBMIT BUTTON */}
        {/* ===================== */}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Save Job
        </button>

      </form>

    </div>
  );
};

export default AddJobForm;