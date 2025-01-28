import React, { useEffect, useState } from "react";
import axios from "axios";

const TopCardBlock = () => {
  const [stats, setStats] = useState({
    totalJobApplications: 0,
    totalJobs: 0,
    totalAccepted: 0,
    totalRejections: 0,
  });

  useEffect(() => {
    // Fetch Total Applicants
    const fetchTotalApplicants = async () => {
      try {
        const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/fetchJobApplicationStatistics`);
        // Ensure the response has the expected structure
        if (response.data && response.data.totalJobApplications !== undefined) {
          setStats(prevStats => ({
            ...prevStats,
            totalJobApplications: response.data.totalJobApplications,
          }));
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching total applicants:", error.response ? error.response.data : error.message);
      }
    };

    // Fetch Total Jobs
    const fetchTotalJobs = async () => {
      try {
        const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/fetchJobStatistics`);
        if (response.data && response.data.totalJobs !== undefined) {
          setStats(prevStats => ({
            ...prevStats,
            totalJobs: response.data.totalJobs,
          }));
        } else {
          console.error("Unexpected response structure for jobs:", response.data);
        }
      } catch (error) {
        console.error("Error fetching total jobs:", error.response ? error.response.data : error.message);
      }
    };

    // Fetch Total Rejected Applicants
    const fetchTotalRejected = async () => {
      try {
        const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/fetchTotalRejectedJobs`);
        if (response.data && response.data.totalRejections !== undefined) {
          setStats(prevStats => ({
            ...prevStats,
            totalRejections: response.data.totalRejections,
          }));
        } else {
          console.error("Unexpected response structure for rejected applicants:", response.data);
        }
      } catch (error) {
        console.error("Error fetching total rejected applicants:", error.response ? error.response.data : error.message);
      }
    };

    // Fetch Total Accepted Applicants
    const fetchTotalAccepted = async () => {
      try {
        const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/getTotalShortlistedApplicants`);
        if (response.data && response.data.totalShortlisted !== undefined) {
          setStats(prevStats => ({
            ...prevStats,
            totalAccepted: response.data.totalShortlisted,
          }));
        } else {
          console.error("Unexpected response structure for accepted applicants:", response.data);
        }
      } catch (error) {
        console.error("Error fetching total accepted applicants:", error.response ? error.response.data : error.message);
      }
    };

    // Fetch all data
    fetchTotalApplicants();
    fetchTotalJobs();
    fetchTotalRejected();
    fetchTotalAccepted(); // Call the new function to fetch accepted applicants
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: stats.totalJobs,
      metaName: "Posted Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: stats.totalJobApplications,
      metaName: "Total Applicants",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-check-circle",
      countNumber: stats.totalAccepted, // This will now display totalShortlisted
      metaName: "Accepted Applicants",
      uiClass: "ui-green",
    },
    {
      id: 4,
      icon: "la-times-circle",
      countNumber: stats.totalRejections,
      metaName: "Rejected Applicants",
      uiClass: "ui-orange",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
