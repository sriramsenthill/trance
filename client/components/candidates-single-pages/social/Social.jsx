const Social = () => {
  const socialContent = [
    { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  ];
  return (
    <div className="social-links">
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
