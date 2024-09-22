import Link from "next/link";
import Slider from "react-slick";
import { Config } from '../../config';
import { useState, useEffect } from "react";
import axios from "axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]); // Ensure this is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Function to fetch profiles from backend
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${Config.BACKEND_URL}/profiles`);

      // Check if response data has profiles key and it's an array
      if (response.data && Array.isArray(response.data.profiles)) {
        setCandidates(response.data.profiles); // Set candidates with the profiles array
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(); // Fetch profiles when component mounts
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const settings = {
    dots: true,
    speed: 1400,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {candidates.slice(0, 12).map((candidate) => (
          <div className="candidate-block" key={candidate.userID}>
            <div className="inner-box">
              <figure className="image">
                <img src="/images/profileLogo.png" alt="avatar" />
              </figure>
              <h4 className="name">{candidate.fullName}</h4>
              <span className="designation">{candidate.jobTitle}</span>
              <div className="location">
                <i className="flaticon-map-locator"></i> {candidate.city}
              </div>
              <Link
                href={`/candidates-single-v1/${candidate.userID}`}
                className="theme-btn btn-style-three"
              >
                <span className="btn-title">View Profile</span>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Candidates;