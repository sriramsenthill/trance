import dynamic from "next/dynamic";
import candidates from "../../data/candidates";
import candidateResume from "../../data/candidateResume";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Seo from "../../components/common/Seo";
import Contact from "../../components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "../../components/candidates-single-pages/shared-components/GalleryBox";
import Social from "../../components/candidates-single-pages/social/Social";
import JobSkills from "../../components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "../../components/candidates-single-pages/shared-components/AboutVideo";
import { Config } from "../../config";

const CandidateSingleDynamicV1 = () => {
  const router = useRouter();
  const [candidate, setCandidate] = useState({});
  const [resume, setResume] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const id = router.query.id;

  useEffect(() => {
      const fetchProfileDetails = async () => {
          if (!id) return;
          try {
              const response = await axios.get(`${Config.BACKEND_URL}/profiles/${id}`);
              setCandidate(response.data);
          } catch (err) {
              setError(err.message || 'Failed to fetch profile details');
          }
      };

      const fetchResumeDetails = async () => {
          if (!id) return;
          try {
              const response = await axios.get(`${Config.BACKEND_URL}/resumes/${id}`);
              setResume(response.data);
          } catch (err) {
              setError(err.message || 'Failed to fetch resume details');
          }
      };

      fetchProfileDetails();
      fetchResumeDetails();
      
  }, [id]);

 

  return (
    <>
      <Seo pageTitle="Candidate Single Dyanmic V1" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-five">
              <div className="inner-box">
                <div className="content">
                  <figure className="image">
                    <img style={{ scale: "102%" }} src="/images/profileLogo.png" alt="avatar" />
                  </figure>
                  <h4 className="name">{candidate?.fullName}</h4>

                  <ul className="candidate-info">
                    <li className="designation">{candidate?.jobTitle}</li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {candidate?.city}
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member
                      Since,Aug 19, 2020
                    </li>
                  </ul>

                  <ul className="post-tags">
                    {candidate?.tags?.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    className="theme-btn btn-style-one"
                    href="/images/sample.pdf"
                    download
                  >
                    Download CV
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>

        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  {/* <!-- About Video Box --> */}
                  <p>
                    {candidate.description}
                  </p>

                  {/* <!-- Candidate Resume Start --> */}
                  <div className="resume-outer">
                
                    {/* Education */}
                    <div className="resume-block">
                      <div className="inner">
                        <div className="title-box">
                          <h3>Education</h3>
                        </div>
                        <div style={{paddingLeft: "30px", paddingTop: "15px"}}>
                          {resume.education && resume.education.map((edu, index) => (
                            <div key={index} className="text">
                              <div className="title-box">
                                <div className="info-box">
                                  <h3>{edu.courseName}</h3>
                                </div>
                                <div className="edit-box">
                                  <span className="year">
                                    {new Date(edu.instituteStart).getFullYear()} - {new Date(edu.instituteEnd).getFullYear()}
                                  </span>
                                </div>
                              </div>
                              <div className="text">{edu.educationDesc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Work Experience */}
                    <div className="resume-block">
                      <div className="inner">
                        <div className="title-box">
                          <h3>Work Experience</h3>
                        </div>
                        <div style={{paddingLeft: "30px", paddingTop: "15px"}}>
                          {resume.workExperience && resume.workExperience.map((work, index) => (
                            <div key={index} className="text">
                              <div className="title-box">
                                <div className="info-box">
                                  <h3>{work.jobRole}</h3>
                                </div>
                                <div className="edit-box">
                                  <span className="year">
                                    {new Date(work.workStart).getFullYear()} - {new Date(work.workEnd).getFullYear()}
                                  </span>
                                </div>
                              </div>
                              <div className="text">{work.experiencedesc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Candidate Resume End --> */}
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">

                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{candidate.experience}</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{candidate.age}</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>{candidate.currentSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>{candidate.expectedSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{candidate.gender}</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>{candidate.languages}</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{candidate.educationLevels}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV1), {
  ssr: false,
});
