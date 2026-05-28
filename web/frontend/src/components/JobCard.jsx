import { useState } from "react";
import {
  updateJob
} from "../services/job.services";
import "./jobcard.css";
const JobCard = ({ job, fetchJobs }) => {
  const [showRoundForm, setShowRoundForm] = useState(false);
const [editingRoundIndex, setEditingRoundIndex] =
  useState(null);
const [newRound, setNewRound] = useState({
  title: "",
  status: "Upcoming",
  scheduledAt: "",
  feedback: ""
});
const handleAddRound = () => {
  setShowRoundForm(true);
};
const saveRound = async () => {
  try {
    let updatedRounds = [...job.rounds];

    if (editingRoundIndex !== null) {
      updatedRounds[editingRoundIndex] = newRound;
    } else {
      updatedRounds.push(newRound);
    }

    await updateJob(job._id, {
      ...job,
      rounds: updatedRounds
    });

    setShowRoundForm(false);

    setEditingRoundIndex(null);

    setNewRound({
      title: "",
      status: "Upcoming",
      scheduledAt: "",
      feedback: ""
    });

    fetchJobs();

  } catch (error) {
    console.log(error);
  }
};
const addToCalendar = (round) => {

  if (!round.scheduledAt) {
    alert("No interview date found");
    return;
  }

  const start =
    new Date(round.scheduledAt);

  const end =
    new Date(
      start.getTime() +
      60 * 60 * 1000
    );

  const formatDate = (date) =>
    date
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(
      `${job.company} - ${round.title}`
    )}` +
    `&dates=${formatDate(start)}/${formatDate(end)}` +
    `&details=${encodeURIComponent(
      round.feedback || job.notes || ""
    )}`;

  window.open(url, "_blank");
};
const handleEditRound = (index) => {
  setEditingRoundIndex(index);

  setNewRound({
    title: job.rounds[index].title || "",
    status: job.rounds[index].status || "Upcoming",
    scheduledAt: job.rounds[index].scheduledAt || "",
    feedback: job.rounds[index].feedback || ""
  });

  setShowRoundForm(true);
};
  const getRoundIcon = (status) => {

    if (status === "Completed") {
      return "✅";
    }

    if (status === "Ongoing") {
      return "🔄";
    }

    return "⏳";
  };

  const getStatusColor = () => {

    if (job.status === "Completed") {
      return "#16a34a";
    }

    if (job.status === "Rejected") {
      return "#dc2626";
    }

    return "#2563eb";
  };

  return (

    <div className="job-card"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              color: "#111827"
            }}
          >
            {job.company}
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#6b7280"
            }}
          >
            {job.role}
          </p>

        </div>

        {/* STATUS BADGE */}

        <div
          style={{
            backgroundColor: getStatusColor(),
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "14px"
          }}
        >
          {job.status}
        </div>

      </div>

      {/* INTERVIEW PIPELINE */}

      <h3
        style={{
          marginBottom: "18px",
          color: "#1f2937"
        }}
      >
        Interview Pipeline
      </h3>

      <div>

       <div
  style={{
    marginTop: "25px"
  }}
>

  {
    job.rounds?.map((round, index) => {

      const isLast =
        index === job.rounds.length - 1;

      const getStepColor = () => {

        if (round.status === "Completed") {
          return "#16a34a";
        }

        if (round.status === "Ongoing") {
          return "#2563eb";
        }

        return "#9ca3af";
      };

      return (

        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
            marginBottom: "30px"
          }}
        >

          {/* LEFT SIDE */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "20px"
            }}
          >

            {/* STEP CIRCLE */}

            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: getStepColor(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >

              {
                round.status === "Completed"
                ? "✓"
                : index + 1
              }
              
            </div>

            {/* CONNECTING LINE */}

            {
              !isLast && (

                <div
                  style={{
                    width: "3px",
                    height: "60px",
                    backgroundColor: "#d1d5db",
                    marginTop: "4px"
                  }}
                />
              )
            }


          </div>


          {/* RIGHT SIDE */}

          <div
  style={{
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  }}
>

  {/* TOP ROW */}

  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "16px"
  }}
>
  <h4
    style={{
      margin: 0,
      fontSize: "18px",
      fontWeight: "700",
      color: "#111827"
    }}
  >
    {round.title || `Round ${index + 1}`}
  </h4>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}
  >
   <button
  onClick={() => handleEditRound(index)}
  style={{
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  }}
>
  Edit
</button>

    <span
      style={{
        backgroundColor: getStepColor(),
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: "600"
      }}
    >
      {round.status}
    </span>
  </div>
</div>

  {/* DATE */}

  <div
    style={{
      marginBottom: "10px"
    }}
  >

    <p
      style={{
        margin: 0,
        fontWeight: "600",
        color: "#374151"
      }}
    >
      Interview Schedule
    </p>

    <p
      style={{
        marginTop: "5px",
        color: "#6b7280"
      }}
    >
      {
        round.scheduledAt
        ? new Date(
            round.scheduledAt
          ).toLocaleString()
        : "Not Scheduled Yet"
      }
    </p>

  </div>

  {/* FEEDBACK */}

  <div>

    <p
      style={{
        margin: 0,
        fontWeight: "600",
        color: "#374151"
      }}
    >
      Feedback / Notes
    </p>
 
    <p
      style={{
        marginTop: "5px",
        color: "#6b7280",
        lineHeight: "1.6"
      }}
    >
      {
        round.feedback
        ? round.feedback
        : "No feedback added yet"
      }
    </p>
           <button
  onClick={() => addToCalendar(round)}
  style={{
    marginTop: "12px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer"
  }}
>
  Add to Google Calendar
</button>
  </div>

</div>

        </div>
      );
    })
  }

</div>
{
  showRoundForm && (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          {
            editingRoundIndex !== null
              ? "Edit Round"
              : "Add Round"
          }
        </h2>

        <input
          type="text"
          placeholder="Round Title"
          value={newRound.title}
          onChange={(e) =>
            setNewRound({
              ...newRound,
              title: e.target.value
            })
          }
        />

        <select
          value={newRound.status}
          onChange={(e) =>
            setNewRound({
              ...newRound,
              status: e.target.value
            })
          }
        >
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>

        <input
          type="datetime-local"
          value={newRound.scheduledAt}
          onChange={(e) =>
            setNewRound({
              ...newRound,
              scheduledAt: e.target.value
            })
          }
        />

        <textarea
          rows="4"
          placeholder="Feedback"
          value={newRound.feedback}
          onChange={(e) =>
            setNewRound({
              ...newRound,
              feedback: e.target.value
            })
          }
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px"
          }}
        >
          <button
            className="delete-btn"
            onClick={() =>
              setShowRoundForm(false)
            }
          >
            Cancel
          </button>

          <button
            className="action-btn"
            onClick={saveRound}
          >
            Save
          </button>

        </div>

      </div>
    </div>
  )
}
      </div>

      {/* ACTION BUTTONS */}

      <div
        style={{
          marginTop: "25px",
          display: "flex",
          gap: "10px"
        }}
      >
        <button
  onClick={handleAddRound}
  style={{
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px"
  }}
>
  + Add Round
</button>
      

        <button
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#dc2626",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default JobCard;