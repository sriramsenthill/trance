import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from 'axios';
import { Config } from '../../../../../config';
import { useRouter } from 'next/router';

const Applicants = () => {
  const router = useRouter();
  const [candidatesData, setCandidatesData] = useState([]);
  const [jobsData, setJobsData] = useState([]); // State for jobs
  const [selectedJobId, setSelectedJobId] = useState(null); // State for selected job ID

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobsData(response.data); // Assuming response contains an array of jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Function to fetch profiles based on selected jobId
  const fetchProfiles = async (jobId) => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/shortlistedProfile`, {
        params: {
          jobId: jobId // Pass the selected jobId
        }
      });
      setCandidatesData(response.data.users);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle job selection change
  const handleJobSelect = (event) => {
    const jobId = event.target.value; // Get the selected job ID (as a string)
    setSelectedJobId(jobId); // Update state with selected job ID
    fetchProfiles(jobId); // Fetch profiles for the selected job ID
  };

  return (
    <>
      <div className="chosen-outer" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0', marginRight: '20px' }}>
              <select 
                className="chosen-single form-select chosen-container" 
                onChange={handleJobSelect} 
                style={{ 
                  width: 'auto', 
                  maxWidth: '200px', 
                  overflow: 'hidden', 
                  whiteSpace: 'nowrap', 
                  padding: '8px',backgroundColor:'#F0F5F7' /* Padding inside the dropdown */
                }}
              >
                <option value="">Select Jobs</option>
                {jobsData.map((job) => (
                  <option key={job.jobId} value={job.jobId}>{job.jobTitle}</option>
                ))}
              </select>
      </div>


      <div className="aplicants-upper-bar">
        <h6>
          {selectedJobId
            ? `${jobsData.find(job => job.jobId === Number(selectedJobId))?.jobTitle || 'Not Found'}`
            : 'Select a Job'}
        </h6>

        <TabList className="aplicantion-status tab-buttons clearfix">
          <Tab className="tab-btn totals"> Total(s): {candidatesData.length}</Tab>
        </TabList>
      </div>

      {candidatesData.slice(0, 23).map((candidate) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={candidate.id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img src="/images/profileLogo.png" alt="candidates" />
              </figure>
              <h4 className="name">
                <Link href={`/candidates-single-v1/${candidate.userID}`}>
                  {candidate.fullName}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{candidate.jobTitle}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {candidate.city}
                </li>
              </ul>
            </div>

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <Link href={`/candidates-single-v1/${candidate.userID}`}>
                    <button data-text="View Application">
                      <span className="la la-eye"></span>
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Applicants;