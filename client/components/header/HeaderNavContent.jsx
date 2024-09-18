import Link from "next/link";
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

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
            <Link href="/">Home</Link>
          </li>
          {/* End homepage menu items */}

          <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
            <Link href="/job-list/job-list-v1">Find Jobs</Link>
          </li>
          {/* End findjobs menu items */}


          <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
            <Link href="/employers-dashboard/dashboard">Employers Dashboard</Link>
          </li>
          {/* End Employers menu items */}


          {/* End Candidates menu items */}
          <li className={isActiveParent(homeItems, router.asPath) ? "current" : ""}>
            <Link href="candidates-dashboard/dashboard">Candidates Dashboard</Link>
          </li>
          {/* <li
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
          </li> */}
          {/* End Blog menu items */}

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
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
