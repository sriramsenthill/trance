import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Step 1: Get applied jobs
        const appliedJobsResponse = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/getAppliedJobs`);
        const appliedJobs = appliedJobsResponse.data;
        console.log("Applied Jobs:", appliedJobs);

        // Step 2: Fetch data for notifications
        const fetchedNotifications = await Promise.all(
          appliedJobs.map(async (job) => {
            try {
              const userResponse = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/profiles/${job.userID}`);
              const user = userResponse.data;

              const jobDetails = await Promise.all(
                job.jobIDs.map(async (jobIDObj) => {
                  try {
                    const jobResponse = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/jobs/${jobIDObj.jobId}`);
                    return {
                      jobTitle: jobResponse.data.jobTitle,
                      isApplied: jobIDObj.isApplied,
                    };
                  } catch (jobError) {
                    console.error("Error fetching job details:", jobError);
                    return null;
                  }
                })
              );

              return {
                userName: user.fullName,
                jobs: jobDetails.filter((job) => job !== null), // Filter out failed jobs
              };
            } catch (userError) {
              console.error("Error fetching user profile:", userError);
              return null;
            }
          })
        );

        setNotifications(fetchedNotifications.filter((notification) => notification !== null));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (notifications.length === 0) {
    return <p>No notifications available.</p>;
  }

  return (
    <ul className="notification-list">
      {notifications.map((notification, index) =>
        notification.jobs.map((job, i) => (
          <li key={`${index}-${i}`} className={job.isApplied ? "success" : ""}>
            <span className="icon flaticon-briefcase"></span>
            <strong>{notification.userName}</strong> applied for <span className="colored">{job.jobTitle}</span> job
          </li>
        ))
      )}
    </ul>
  );
};

export default Notification;
