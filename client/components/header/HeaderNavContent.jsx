import Link from "next/link";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";

const HeaderNavContent = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get session data

  // Check if session exists and log user role safely
  const userRole = session?.user?.role;

  console.log("Session data:", session);
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* Home menu item */}
          <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
            <Link href="/">Home</Link>
          </li>

          {userRole === 'candidate' ? (
            <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
              <Link href="/job-list/job-list-v1">Find Jobs</Link>
            </li>
          ) : null}

          {/* Conditional rendering for Dashboard based on user role */}
          {userRole === 'candidate' ? (
            <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
              <Link href="/candidates-dashboard/dashboard">Candidates Dashboard</Link>
            </li>
          ) : userRole === 'employer' ? (
            <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
              <Link href="/employers-dashboard/dashboard">Employers Dashboard</Link>
            </li>
          ) : null}

          {/* Blog menu items (commented out) */}
          {/* 
          <li
            className={`${
              isActiveParentChaild(blogItems, router.asPath) ? "current" : ""
            } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, router.asPath) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> 
          */}

          {/* About menu items */}
          <li
            className={`${isActiveParentChaild(pageItems, router.asPath) ||
              isActiveParentChaild()
              ? "current "
              : ""
              } dropdown`}
          >
            <span>About</span>
            <ul>
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, router.asPath) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;