import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applied jobs data
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAppliedJobs');
        const jobs = response.data;

        // Fetch user and job details in parallel
        const notifications = await Promise.all(jobs.map(async (job) => {
          const userResponse = await axios.get(`http://localhost:3000/profiles/${job.userID}`);
          const user = userResponse.data;

          // Map job IDs to fetch job details
          const jobDetails = await Promise.all(job.jobIDs.map(async (jobID) => {
            const jobResponse = await axios.get(`http://localhost:3000/jobs/${jobID.jobId}`);
            return {
              jobTitle: jobResponse.data.jobTitle,
              isApplied: jobID.isApplied,
            };
          }));

          return {
            userName: user.fullName, // Assuming the response has a 'fullName' field
            jobs: jobDetails,
          };
        }));

        setAppliedJobs(notifications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <ul className="notification-list">
      {appliedJobs.map((notification, index) => (
        notification.jobs.map((job, i) => (
          <li key={`${index}-${i}`} className={job.isApplied ? "success" : ""}>
            <span className="icon flaticon-briefcase"></span>
            <strong>{notification.userName}</strong> applied for <span className="colored">{job.jobTitle}</span> job
          </li>
        ))
      ))}
    </ul>
  );
};

export default Notification;
