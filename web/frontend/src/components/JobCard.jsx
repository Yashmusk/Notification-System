const JobCard = ({ job }) => {

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

    <div
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
      marginBottom: "12px"
    }}
  >

    <h4
      style={{
        margin: 0,
        fontSize: "18px",
        color: "#111827"
      }}
    >
      {round.title}
    </h4>

    <span
      style={{
        backgroundColor: getStepColor(),
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600"
      }}
    >
      {round.status}
    </span>

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

  </div>

</div>

        </div>
      );
    })
  }

</div>

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
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Edit
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