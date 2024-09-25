import Link from "next/link";

const RegBanner2 = () => {
  const regBannerContent = [
    {
      id: 1,
      name: "Employer",
      text: "Efficiently manage your job postings and review qualified candidates. Streamline your recruitment process with help of ai integrated AI",
      
      bannerClass: "banner-style-one",
    },
    {
      id: 2,
      name: "Candidate",
      text: "Explore thousands of job opportunities that match your skills and preferences.Create a profile, apply for jobs, and start your career journey with ease.",
      
      bannerClass: "banner-style-two",
    },
  ];
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
                login
              </Link>
            </div>
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
