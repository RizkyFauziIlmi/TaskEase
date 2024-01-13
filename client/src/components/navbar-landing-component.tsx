import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

import logo from "../assets/logo.png";
import IconGithub from "../components/svg/github-svg";
import IconDiscord from "../components/svg/discord-svg";
import IconGmail from "../components/svg/gmail-svg";
import useTheme from "../hooks/use-theme";
import { Menu } from "lucide-react";
import { scrollToElement, scrollToTop } from "../lib/scroll";
import { useNavigate } from "react-router-dom";
import IconInstagram from "./svg/instagram-svg";

interface NavbarLandingComponentProps {
  isDocumentation?: boolean;
}

export const NavbarLandingComponent = ({
  isDocumentation = false,
}: NavbarLandingComponentProps) => {
  const { changeTheme, theme } = useTheme();
  const [navbarHeight, setNavbarHeight] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  const navigate = useNavigate();

  const handleChange = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const myNavbar = navbarRef.current;

    if (myNavbar) {
      setNavbarHeight(myNavbar.clientHeight);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Tambahkan event listener untuk scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener pada saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={navbarRef}
        className={`flex justify-between py-4 px-6 items-center z-50 transition duration-200 ${scrollY >= navbarHeight ? "bg-base-200" : ``
          } ${isDocumentation ? "bg-base-200" : "sticky top-0"}`}
      >
        <div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              isDocumentation ? navigate("/") : scrollToTop();
            }}
          >
            <img src={logo} alt="logo" className="h-8 w-8" />
            <h4 className="font-bold text-md">TaskEase</h4>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-5 font-light">
            <p
              className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
              onClick={() => {
                isDocumentation
                  ? (window.location.href = "/#feature")
                  : scrollToElement("feature");
              }}
            >
              Feature
            </p>
            <p
              className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
              onClick={() => {
                isDocumentation
                  ? (window.location.href = "/#showcase")
                  : scrollToElement("showcase");
              }}
            >
              Showcase
            </p>
            <p
              className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
              onClick={() => {
                isDocumentation
                  ? (window.location.href = "/#techstack")
                  : scrollToElement("techstack");
              }}
            >
              Tech Stack
            </p>
            {!isDocumentation && (
              <p
                className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
                onClick={() => navigate("/documentation")}
              >
                Documentation
              </p>
            )}
          </div>
          <div className="h-6 w-[1px] bg-primary"></div>
          <div>
            <label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleChange}
                className="toggle theme-controller"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          <div className="h-6 w-[1px] bg-primary"></div>
          <div className="flex items-center gap-4">
            <a href="mailto:rizkyfauziilmi@gmail.com" target="_blank">
              <IconGmail className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
            </a>
            <a href="https://www.instagram.com/taskease.todo" target="_blank">
              <IconInstagram className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
            </a>
            <a href="https://discord.com/invite/fDatmxxSEP" target="_blank">
              <IconDiscord className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
            </a>
            <a
              href="https://github.com/RizkyFauziIlmi/TaskEase"
              target="_blank"
            >
              <IconGithub className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
            </a>
          </div>
        </div>
        {/* Mobile */}
        <div className="drawer md:hidden drawer-end w-fit z-[150]">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-ghost"
            >
              <Menu />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <div className="md:hidden flex flex-col items-center gap-6">
                <div className="flex gap-5 font-light">
                  <p
                    className="cursor-pointer op
              ity-70 hover:opacity-100 hover:text-primary transition-all"
                    onClick={() => scrollToElement("feature")}
                  >
                    Feature
                  </p>
                  <p
                    className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    onClick={() => scrollToElement("showcase")}
                  >
                    Showcase
                  </p>
                  <p
                    className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    onClick={() => scrollToElement("techstack")}
                  >
                    Tech Stack
                  </p>
                  <p
                    className="cursor-pointer opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    onClick={() => navigate("/documentation")}
                  >
                    Documentation
                  </p>
                </div>
                <div className="h-6 w-[1px] bg-primary"></div>
                <motion.div>
                  <label className="flex cursor-pointer gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input
                      type="checkbox"
                      checked={theme === "dark"}
                      onChange={handleChange}
                      className="toggle theme-controller"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </label>
                </motion.div>
                <div className="h-6 w-[1px] bg-primary"></div>
                <div className="flex items-center gap-4">
                  <a href="mailto:rizkyfauziilmi@gmail.com" target="_blank">
                    <IconGmail className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
                  </a>
                  <a href="https://www.instagram.com/taskease.todo" target="_blank">
                    <IconInstagram className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
                  </a>
                  <a href="https://discord.com/invite/fDatmxxSEP" target="_blank">
                    <IconDiscord className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
                  </a>
                  <a
                    href="https://github.com/RizkyFauziIlmi/TaskEase"
                    target="_blank"
                  >
                    <IconGithub className="h-6 w-6 cursor-pointer hover:scale-105 hover:text-primary transition-all" />
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
        {isDocumentation ? null : (
          <motion.div
            style={{ scaleX }}
            className={`h-1 w-full bg-primary absolute bottom-0 left-0 z-[100]`}
          />
        )}
      </div>
    </>
  );
};
