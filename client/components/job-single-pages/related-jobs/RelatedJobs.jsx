import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const RelatedJobs = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobs(response.data.slice(0, 4)); // Assuming response.data is an array of jobs
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
        <div className="job-block" key={item.id}>
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
                <li>
                  <span className="icon flaticon-clock-3"></span> {item.datePosted}
                </li>
                {/* Time info */}
                <li>
                  <span className="icon flaticon-money"></span> {item.offeredSalary}
                </li>
                {/* Salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
                {Array.isArray(item.jobType) && item.jobType.map((val, i) => (
                  <li key={i} className={`${val.styleClass}`}>
                    {val.type}
                  </li>
                ))}
              </ul>
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

export default RelatedJobs; 