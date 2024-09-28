"use client";
import Link from "next/link";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import { isActiveLink, isActiveParentChaild } from "../../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const Index = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <ProSidebarProvider>
        <Sidebar>
          <Menu>
            {mobileMenuData.map((item) => (
              <SubMenu
                className={isActiveParentChaild(item.items, router.asPath) ? "menu-active" : ""}
                label={item.label}
                key={item.id}
              >
                {item.label === "Dashboard" && userRole ? (
                  <>
                    {userRole === 'candidate' && (
                      <MenuItem
                        className={isActiveLink("/candidates-dashboard/dashboard", router.asPath) ? "menu-active-link" : ""}
                        key="candidate-dashboard"
                        routerLink={<Link href="/candidates-dashboard/dashboard" />}
                      >
                        Candidates Dashboard
                      </MenuItem>
                    )}
                    {userRole === 'employer' && (
                      <MenuItem
                        className={isActiveLink("/employers-dashboard/dashboard", router.asPath) ? "menu-active-link" : ""}
                        key="employer-dashboard"
                        routerLink={<Link href="/employers-dashboard/dashboard" />}
                      >
                        Employers Dashboard
                      </MenuItem>
                    )}
                  </>
                ) : (
                  item.items.map((menuItem, i) => (
                    <MenuItem
                      className={isActiveLink(menuItem.routePath, router.asPath) ? "menu-active-link" : ""}
                      key={i}
                      routerLink={<Link href={menuItem.routePath} />}
                    >
                      {menuItem.name}
                    </MenuItem>
                  ))
                )}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

      <SidebarFooter />
    </div>
  );
};

export default Index;