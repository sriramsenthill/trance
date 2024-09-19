import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '../../../config'; // Import the Config object

const JobDetailsDescriptions = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Get the job ID from the URL
        const pathSegments = window.location.pathname.split('/');
        const id = parseInt(pathSegments[pathSegments.length - 1], 10); // Assuming the ID is the last segment

        if (isNaN(id)) {
          throw new Error('Invalid job ID format');
        }

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

  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>{jobDetails.jobDesc}</p>
      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        {jobDetails.keyRes.split('\n').map((res, index) => (
          <li key={index}>{res}</li>
        ))}
      </ul>
      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        {/* Assuming you have similar fields for skills in your response */}
        <ul className="list-style-three">
          {jobDetails.skills.split('\n').map((skills, index) => (
            <li key={index}>{skills}</li>
          ))}
        </ul>

      </ul>
    </div >
  );
};

export default JobDetailsDescriptions;