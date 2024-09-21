import React, { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
import { Config } from '../../../../../config';

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/getAllJobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to handle job deletion
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${Config.BACKEND_URL}/jobs/${jobId}`);
      // Refresh the job listings after deletion
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
        <div className="chosen-outer">
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 years</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
                  <td>
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
                              {job.companyName}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {job.city}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td>
                  <td>
                    October 27, 2017<br />
                    April 25, 2011
                  </td>
                  <td className="status">Active</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {/* View Application Button */}
                        <li>
                          <button data-text="View Application">
                            <span className="la la-eye"></span>
                          </button>
                        </li>

                        {/* Reject Application Button */}
                        <li>
                          <button data-text="Reject Application">
                            <span className="la la-pencil"></span>
                          </button>
                        </li>

                        {/* Delete Application Button */}
                        <li>
                          <button 
                            data-text="Delete Application" 
                            onClick={() => handleDeleteJob(job.jobId)} // Call handleDeleteJob with jobId
                          >
                            <span className="la la-trash"></span>
                          </button>
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
    </div>
  );
};

export default JobListingsTable;