import Link from "next/link";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../../../../../config'; // Adjust the path as needed
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

const JobFavouriteTable = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get session data
  const [jobsData, setJobsData] = useState([]); // State for shortlisted jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch shortlisted jobs for the user
  const fetchShortlistedJobs = async () => {
    if (!session || !session.user || !session.user.userID) {
      console.error('User ID is not available in session');
      return;
    }

    try {
      const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/getJobsForUser`, {
        params: { userID: session.user.userID } // Pass userID as a query parameter
      });
      setJobsData(response.data.jobs); // Assuming response contains a 'jobs' array
    } catch (error) {
      console.error('Error fetching shortlisted jobs:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch shortlisted jobs on component mount
  useEffect(() => {
    fetchShortlistedJobs();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Favorite Jobs</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 years</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobsData.length === 0 ? (
                <tr>
                  <td colSpan="4">No shortlisted jobs found.</td>
                </tr>
              ) : (
                jobsData.map((job) => (
                  <tr key={job.jobId}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            
                              <span className="company-logo">
                                <img src="/images/hexaware.png" alt="logo" />
                              </span>
                          
                            <h4>
                              <Link href={`/job/${job.jobId}`}>
                                {job.jobTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {job.companyName || "Segment"}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {job.city || "Location"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Replace with actual date and status if available */}
                    <td className="status">{job.status || "Active"}</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link href={`/job/${job.jobId}`}>
                              <button data-text="View Job Details">
                                <span className="la la-eye"></span>
                              </button>
                            </Link>
                          </li>
                          {/* Additional actions can be added here */}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobFavouriteTable;