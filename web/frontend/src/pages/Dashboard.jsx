import { useEffect, useState } from "react";
import { getJobs } from "../services/job.services.js";
import AddJobForm from "../components/AddJobForm";
import JobCard from "../components/JobCard.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

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
          (round) => round.status === "Completed"
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
        (job) => job.status === "Rejected"
      ).length
    };
  };

  const stats = getStats(jobs);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Job Tracker</h1>
          <p>
            Track interviews, rounds & reminders in one place
          </p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">

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

      {/* Search */}
      <div className="search-row">
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Add Job Form */}
      <div className="add-job-wrapper">
        <AddJobForm fetchJobs={fetchJobs} />
      </div>

      {/* Job Cards */}
      <div className="jobs-list">
        {jobs
          .filter((job) =>
            job.company
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((job) => (
            <div
              key={job._id}
              className="job-section"
            >
              <div className="company-header">

                <p className="company-label">
                  Company Name
                </p>

                <h2>
                  {job.company}
                </h2>

                <p className="role-text">
                  {job.role}
                </p>
              </div>

              <JobCard
                job={job}
                fetchJobs={fetchJobs}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;