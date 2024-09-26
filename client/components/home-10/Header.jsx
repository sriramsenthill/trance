import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "../header/HeaderNavContent";
import { useSession, signOut } from "next-auth/react"; // Import signOut
import { useRouter } from "next/router"; // Import useRouter

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const { data: session } = useSession();
  const router = useRouter(); // Initialize the router

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground); // Clean up the event listener
    };
  }, []);

  const handleLogout = async () => {
    router.push('/login'); // Redirect to login page
  };

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-four ${navbar ? "fixed-header animated slideInDown" : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="#">
                  <div style={{
                    fontFamily: 'Armio',
                    color: "white",
                  }}>
                    <h1>Trance</h1>
                  </div>
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="btn-box">
              {!session ? (
                <Link
                  href="/login"
                  className="theme-btn btn-style-six call-modal"
                >
                  Login / Register
                </Link>
              ) : (
                <>
                  {session.user.role === 'employer' && (
                    <Link
                      href="/employers-dashboard/post-jobs"
                      className="theme-btn btn-style-five"
                    >
                      Job Post
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="theme-btn btn-style-six"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;