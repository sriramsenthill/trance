const SocialTwo = () => {
  const socialContent = [
    {
      id: 3,
      name: "Linkedin",
      icon: "fa-likedin",
      iconClass: "linkedin",
      link: "https://www.linkedin.com/company/hexaware-technologies/",
    },
  ];

  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          className={item.iconClass}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i> {item.name}
        </a>
      ))}
    </>
  );
};

export default SocialTwo;
