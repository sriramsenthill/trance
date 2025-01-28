import Link from "next/link";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession
import { Config } from '../../../../../config';

const JobListingsTable = () => {
  const { data: session } = useSession(); // Get the session data
  const [jobs, setJobs] = useState([]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    if (!session || !session.user || !session.user.userID) {
      console.error('User ID is not available in session');
      return;
    }

    try {
      const response = await axios.get(`${Config.NEXT_PUBLIC_SERVER_HOST}/applied-jobs`, {
        params: { userID: session.user.userID }, // Send userID as a query parameter
      });
      setJobs(response.data.jobs); // Assuming the response contains a 'jobs' field
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, [session]); // Re-run when session changes

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as MM/DD/YYYY
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>

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
                <th>Date Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, jobs.length).map((item) => (
                <tr key={item.jobID}> {/* Changed to item.jobID */}
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <img src="/images/hexaware.png" alt="logo" />
                          </span>
                          <h4>
                            <Link href={`/job/${item.jobId}`}>
                              {item.jobTitle}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {item.companyName}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item.city}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Assuming job.datePosted is available in your job item */}
                  <td>{formatDate(item.datePosted)}</td>
                  <td className="status">Active</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <Link href={`/job/${item.jobId}`}>
                            <button data-text="View Application">
                              <span className="la la-eye"></span>
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;