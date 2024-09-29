import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession hook

const RegBanner2 = () => {
  const { data: session } = useSession(); // Get session data

  const regBannerContent = [
    {
      id: 1,
      name: "Employer",
      text: "Efficiently manage your job postings and review qualified candidates. Streamline your recruitment process with help of integrated AI.",
      bannerClass: "banner-style-one",
      avatar: "/path/to/employer-image.jpg", // Add appropriate image path
    },
    {
      id: 2,
      name: "Candidate",
      text: "Explore thousands of job opportunities that match your skills and preferences. Create a profile, apply for jobs, and start your career journey with ease.",
      bannerClass: "banner-style-two",
      avatar: "/path/to/candidate-image.jpg", // Add appropriate image path
    },
  ];

  // If userID exists, return null to not display anything
  if (session?.user?.userID) {
    return null; // Or you could return <></> for an empty fragment
  }

  return (
    <>
      {regBannerContent.map((item) => (
        <div
          className={`${item.bannerClass} -type-2 col-lg-6 col-md-12 col-sm-12`}
          key={item.id}
        >
          <div className="inner-box">
            <div className="content">
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <Link href="/register" className="theme-btn btn-style-five">
                Register
              </Link>
            </div>
            {/* Always render the figure when userID is not present */}
            <figure className="image">
              <img src={item.avatar} alt="resource" />
            </figure>
          </div>
        </div>
      ))}
    </>
  );
};

export default RegBanner2;