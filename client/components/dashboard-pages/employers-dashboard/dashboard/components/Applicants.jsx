import React, { useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
import { Config } from '../../../../../config';
import { useRouter } from 'next/router';

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${Config.BACKEND_URL}/getAllUserProfiles`);
        setApplicants(response.data.users);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <>
      {applicants.map((applicant) => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={applicant.userID}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img src="/images/profileLogo.png" alt="applicant" />
              </figure>
              <h4 className="name">
                <Link href={`/candidates-single-v1/${applicant.userID}`}>
                  {applicant.fullName || 'N/A'}
                </Link>
              </h4>

              <ul className="candidate-info">
                <li className="designation">{applicant.jobTitle || 'N/A'}</li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {applicant.city}
                </li>
              </ul>
            </div>

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <Link href={`/candidates-single-v1/${applicant.userID}`}>
                    <button data-text="View Application">
                      <span className="la la-eye"></span>
                    </button>
                  </Link>
                </li>
                <li>
                  <button data-text="Approve Application">
                    <span className="la la-check"></span>
                  </button>
                </li>
                 <li>
                  <button data-text="Reject Application">
                    <span className="la la-times-circle"></span>
                  </button>
                </li>
                <li>
                  <button data-text="Delete Application">
                    <span className="la la-trash"></span>
                  </button>
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