import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../../../config'; // Import the Config object


const JobOverView = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Extract job ID from the URL
        const pathSegments = window.location.pathname.split('/');
        const id = parseInt(pathSegments[pathSegments.length - 1], 10); // Assuming the ID is the last segment

        if (isNaN(id)) {
          throw new Error('Invalid job ID format');
        }

        // Fetch job details from the backend
        const response = await axios.get(`${Config.BACKEND_URL}/jobs/${id}`);
        setJobDetails(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if skills is an array before using join
  const skillsList = Array.isArray(jobDetails.skills) ? jobDetails.skills.join(', ') : 'No skills listed';

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{new Date(jobDetails.datePosted).toLocaleString()}</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration Date:</h5>
          <span>{new Date(jobDetails.appDeadLine).toLocaleDateString()}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{jobDetails.city}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobDetails.jobTitle}</span>
        </li>
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{jobDetails.offeredSalary}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;