import Link from "next/link";

const BrowseUsaJobs = () => {
  const jobListContent = [
    {
      id: 1,
      title: "Popular Job Categories",
      jobListItem: [
        { name: "Software Development Jobs", link: "/job-list/job-list-v1" },
        { name: "Data Science Jobs", link: "/job-list/job-list-v1" },
        { name: "DevOps Jobs", link: "/job-list/job-list-v1" },
        { name: "Cloud Engineering Jobs", link: "/job-list/job-list-v1" },
        { name: "AI/ML Jobs", link: "/job-list/job-list-v1" },
        { name: "Cybersecurity Jobss", link: "/job-list/job-list-v1" },
        { name: "IT Support Jobs", link: "/job-list/job-list-v1" },
        { name: "Product Management Jobs", link: "/job-list/job-list-v1" },
      ],
    },
    {
      id: 2,
      title: "Popular Job Titles",
      jobListItem: [
        { name: "Software Engineer", link: "/job-list/job-list-v2" },
        { name: "Data Scientist", link: "/job-list/job-list-v2" },
        { name: "DevOps Engineer", link: "/job-list/job-list-v2" },
        { name: "Cloud Architect", link: "/job-list/job-list-v2" },
        { name: "Machine Learning Engineer", link: "/job-list/job-list-v2" },
        { name: "Cybersecurity Analysts", link: "/job-list/job-list-v2" },
        { name: "Product Manager", link: "/job-list/job-list-v2" },
      ],
    },
    {
      id: 3,
      title: "Popular Job Categories",
      jobListItem: [
        { name: "NYC, NY Jobs", link: "/job-list/job-list-v3" },
        { name: "Houston, TX Jobs", link: "/job-list/job-list-v3" },
        { name: "Seattle, WA", link: "/job-list/job-list-v3" },
        { name: "Bengaluru, India", link: "/job-list/job-list-v3" },
        { name: "Hyderabad, India ", link: "/job-list/job-list-v3" },
        { name: "Chennai, India ", link: "/job-list/job-list-v3" },
        { name: "Dallas, TX Jobs", link: "/job-list/job-list-v3" },
      ],
    },
    {
      id: 4,
      title: "Popular Tech Stacks",
      jobListItem: [
        { name: "Full-Stack Development ", link: "/job-list/job-list-v4" },
        { name: "Cloud Platforms", link: "/job-list/job-list-v4" },
        { name: "Data Engineering ", link: "/job-list/job-list-v4" },
        { name: "AI/ML Frameworks", link: "/job-list/job-list-v4" },
        { name: "DevOps Tools", link: "/job-list/job-list-v4" },
        { name: "Cybersecurity Tools", link: "/job-list/job-list-v4" },
        { name: "IT Support Tools ", link: "/job-list/job-list-v4" },
      ],
    },
  ];

  return (
    <>
      {jobListContent.map((item) => (
        <div className="column col-lg-3 col-md-6 col-sm-12" key={item.id}>
          <h4>{item.title}</h4>
          <ul className="links-list">
            {item.jobListItem.map((job, i) => (
              <li key={i}>
                <Link href={job.link}>{job.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default BrowseUsaJobs;
