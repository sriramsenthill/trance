import dynamic from "next/dynamic";
import jobs from "../../data/job-featured";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Assuming you're using Next.js
import Seo from "../../components/common/Seo";
import RelatedJobs from "../../components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "../../components/job-single-pages/job-overview/JobOverView";
import JobSkills from "../../components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "../../components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "../../components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "../../components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "../../components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "../../components/job-single-pages/shared-components/ApplyJobModalContent";
import { Config } from "../../config";
import { useSession } from 'next-auth/react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobSingleDynamicV1 = () => {
  const router = useRouter();
  const [company, setCompany] = useState(null); // Initialize company as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = router.query.id;
  const { data: session } = useSession(); // Get user session
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [candidate, setCandidates] = useState({});
  const [isApplied, setIsApplied] = useState(false);

  const fetchJobDetailsAndCheckStatus = async () => {
    if (!id) return; // If id is not available, do nothing

    try {
      // Fetch job details from the backend
      const jobResponse = await axios.get(`${Config.BACKEND_URL}/jobs/${id}`);
      setCandidates(jobResponse.data); // Set company data from response

      // Check application status
      if (session && session.user && session.user.userID) {
        const checkResponse = await axios.post(`${Config.BACKEND_URL}/checkApplied`, {
          userID: session.user.userID,
          jobID: parseInt(id, 10),
        });
        setIsApplied(checkResponse.data.isApplied);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch job details or application status');

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetailsAndCheckStatus(); // Call this function when component mounts
  }, [id]); // Dependencies for useEffect

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const handleApplyForJob = async () => {
    if (!session || !session.user || !session.user.userID) {
      alert("You must be logged in to apply for a job.");
      return;
    }

    try {
      const response = await axios.post(`${Config.BACKEND_URL}/applyjob`, {
        userID: session.user.userID,
        jobID: parseInt(id, 10),
      });

      if (response.status === 201) {
        setSnackbarMessage("Job Applied Successfully.");
        setSnackbarOpen(true);
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      setSnackbarMessage("Failed to apply. You might have already applied.");
      setSnackbarOpen(true);
    }
  };



  return (
    <>
      <Seo pageTitle="Job Single Dyanmic V1" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img
                      src="/images/hexaware.png"
                      alt="logo"
                      style={{
                        width: '100px', // Set width
                        height: '100px', // Set height equal to width for square
                        borderRadius: '50%', // Make it circular
                        objectFit: 'cover' // Ensure the image covers the container without distortion
                      }}
                    />
                  </span>

                  <h4>{candidate?.jobTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {candidate?.companyName}
                    </li>
                    {/* Company info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.city}
                    </li>
                    {/* Location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {new Date(candidate?.datePosted).toLocaleString()}
                    </li>
                    {/* Date Posted info */}
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      ${candidate?.offeredSalary}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  {/* Job Type Section */}
                  <ul className="job-other-info">
                    {Array.isArray(company?.jobType) ? (
                      candidate.jobType.map((val, i) => (
                        <div key={i} className={`${val.styleClass}`}>
                          {val.type}
                        </div>
                      ))
                    ) : (
                      <li>{candidate?.jobType || 'No job type listed'}</li> // Handle non-array case
                    )}
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    onClick={handleApplyForJob}
                  >
                    {isApplied ? 'Applied' : 'Apply For Job'}
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
                {/* End apply for job btn */}

                {/* <!-- Modal --> */}

                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions />
                {/* End jobdetails content */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  {/* End title box */}

                  <RelatedJobs />
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    {/* <!-- Job Overview --> */}
                    <h4 className="widget-title">Job Overview</h4>
                    <div style={{ marginBottom: '20px' }}>  {/* Adjust the value as needed */}
                      <JobOverView />
                    </div>
                    {/* <!--  Map Widget --> */}

                    <h4 className="widget-title">Job Skills</h4>
                    <div className="widget-content">
                      <JobSkills />
                    </div>
                    {/* <!-- Job Skills --> */}
                  </div>
                  {/* End .sidebar-widget */}

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img src="/images/hexaware.png"
                            style={{
                              borderRadius: '50%', // Make it circular
                            }}
                            alt="resource" />
                        </div>
                        <h5 className="company-name">{candidate.company}</h5>
                        <a href="https://www.linkedin.com/company/hexaware-technologies/" className="profile-link">
                          View company profile
                        </a>
                      </div>
                      {/* End company title */}

                      <CompnayInfo />

                      <div className="btn-box">
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {candidate?.link}
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {/* End .company-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});
