import { useEffect, useState } from "react";

import {
  getJobs
} from "../services/job.services.js";
import AddJobForm from "../components/AddJobForm";
import JobCard from "../components/JobCard.jsx";
const Dashboard = () => {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] =
  useState("");
  useEffect(() => {

    fetchJobs();

  }, []);

const getStats = (jobs) => {
  let upcoming = 0;
  let ongoing = 0;
  let completed = 0;
  let offers = 0;

  jobs.forEach((job) => {
    job.rounds?.forEach((round) => {
      if (round.status === "Upcoming") upcoming++;

      if (round.status === "Ongoing") ongoing++;

      if (round.status === "Completed") completed++;
    });

    const allRoundsCompleted =
      job.rounds?.length > 0 &&
      job.rounds.every(
        (round) =>
          round.status === "Completed"
      );

    if (
      allRoundsCompleted &&
      job.status !== "Rejected"
    ) {
      offers++;
    }
  });

  return {
    total: jobs.length,
    upcoming,
    ongoing,
    completed,
    offers,

    rejected: jobs.filter(
      (job) =>
        job.status === "Rejected"
    ).length
  };
};
const stats = getStats(jobs);
  const fetchJobs = async () => {

    try {

      const data = await getJobs();

      console.log(data);

      setJobs(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  }}
>

  <h1>
    Job Tracker Dashboard
  </h1>

  <button onClick={handleLogout}>
    Logout
  </button>

</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "30px"
  }}
>

  <div className="stat-card">
    <h3>{stats.total}</h3>
    <p>Total Jobs</p>
  </div>
  <div className="stat-card">
    <h3>{stats.ongoing}</h3>
    <p>Ongoing</p>
  </div>

  <div className="stat-card">
    <h3>{stats.upcoming}</h3>
    <p>Upcoming</p>
  </div>

  <div className="stat-card">
    <h3>{stats.offers}</h3>
    <p>Offers</p>
  </div>

  <div className="stat-card">
    <h3>{stats.rejected}</h3>
    <p>Rejected</p>
  </div>

</div>
<input
  type="text"
  placeholder="Search by company..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "25px"
  }}
/>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />
      <AddJobForm />
      <hr/>
      {
        jobs.length === 0
        ? (
          <p>No jobs found</p>
        )
        : (
          jobs
  .filter((job) =>
    job.company
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  ).map((job) => (

           <JobCard
  key={job._id}
  job={job}
/>
          ))
        )
      }

    </div>
  );
};

export default Dashboard;