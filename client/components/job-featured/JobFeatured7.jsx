import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Assuming you're using Next.js for routing
import { Config } from '../../config';
const JobFeatured7 = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobs(response.data.slice(0, 5)); // Assuming response.data is an array of jobs
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
                <img
                  src="/images/hexaware.png"
                  style={{ scale: "70%", borderRadius: "25%", objectFit: "cover" }}
                  alt="item brand"
                />
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
                  <span className="icon flaticon-clock-3"></span>{" "}
                  {new Date(item.datePosted).toLocaleDateString()} {/* Format date */}
                </li>
                {/* Date Posted info */}
                <li>
                  <span className="icon flaticon-money"></span>{" "}
                  ${item.offeredSalary}
                </li>
                {/* Salary info */}
              </ul>
              {/* End .job-info */}
            </div>
            <ul className="job-other-info">
              {Array.isArray(item.jobType) && item.jobType.slice(0, 1).map((val, i) => (
                <li key={i} className={`${val.styleClass}`}>
                  {val.type}
                </li>
              ))}
            </ul>
            <Link
              href={`/job/${item.jobId}`}
              className="theme-btn btn-style-eight"
            >
              Apply Job
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobFeatured7;