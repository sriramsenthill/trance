import Link from "next/link";
import recentJobApplied from "../../../../../data/job-featured";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession
import { Config } from '../../../../../config';

const JobApplied = () => {
  const { data: session } = useSession(); // Get the session data
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    if (!session || !session.user || !session.user.userID) {
      console.error('User ID is not available in session');
      return;
    }

    try {
      const response = await axios.get(`${Config.BACKEND_URL}/applied-jobs`, {
        params: { userID: session.user.userID }, // Send userID as a query parameter
      });
      setJobs(response.data.jobs); // Assuming the response contains a 'jobs' field
      console.log(response.data.jobs);
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
    <>
      {jobs.slice(0, 6).map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img src="/images/hexaware.png" alt="item brand" />
              </span>
              <h4>
                <Link href={`/job/${item.jobId}`}>{item.jobTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.companyName}
                </li>
                {/* compnay info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.city}
                </li>

                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span> {item.offeredSalary}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}


              {/* End .job-other-info */}

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobApplied;
