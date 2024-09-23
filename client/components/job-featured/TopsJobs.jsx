import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Config } from '../../config';

const TopsJobs = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobs(response.data.slice(0, 3)); // Assuming response.data is an array of jobs
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when component mounts
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {jobs.map((item) => (
        <div className="job-block-five" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img src="/images/hexaware.png" style={{ borderRadius: "20%" }} alt="item brand" />
              </span>
              <h4>
                <Link href={`/job/${item.jobId}`}>{item.jobTitle}</Link>
              </h4>
              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.companyName}
                </li>
                {/* Company info */}
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.city}
                </li>
                {/* Location info */}
              </ul>
              {/* End .job-info */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopsJobs;