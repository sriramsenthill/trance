import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Config } from '../../config';
const RecentJobs = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobs(response.data.slice(0, 2)); // Assuming response.data is an array of jobs
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
        <div className="job-block-four" key={item.id}>
          <div className="inner-box">
            <ul className="job-other-info">
              {Array.isArray(item.jobType) && item.jobType.map((val, i) => (
                <li key={i} className={`${val.styleClass}`}>
                  {val.type}
                </li>
              ))}
            </ul>
            <span className="company-logo">
              <img src="/images/hexaware.png" alt="featured job" />
            </span>
            <span className="company-name">{item.companyName}</span>
            <h4>
              <Link href={`/job-single-v3/${item.id}`}>{item.jobTitle}</Link>
            </h4>
            <div className="location">
              <span className="icon flaticon-map-locator"></span>
              {item.city}
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default RecentJobs;