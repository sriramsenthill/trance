import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterContent4 from "../footer/FooterContent4";

const Footer = () => {
  return (
    <footer className="main-footer style-six alternate">
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-3 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <h1 style={{fontFamily:"Arima", color:"white"}}>Trance</h1>
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="thebeehost@support.com">1800 - 425 - 1770</a>
                </p>
                <p className="address">
                  Sathyabama university, jeppiar nagar
                  <br /> chennai-600119 <br />
                  <a href="mailto:support@superio.com" className="email">
                    sriram.senthilnathan@gmail.com
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-9 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent4 />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;
