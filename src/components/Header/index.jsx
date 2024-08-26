import { useState, useEffect } from "react";
import WitsLogo from "./Wits_logo.png";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("Menu toggled:", !menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // 清理事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 w-full transform border border-cyan-800 transition-all duration-500 ease-in-out lg:flex lg:h-[60px] lg:flex-row lg:items-center lg:justify-between ${
        menuOpen
          ? "md:relative md:flex md:h-screen md:translate-y-0 md:flex-col md:items-center md:justify-center md:overflow-hidden"
          : "md:relative md:flex md:h-[60px] md:items-center md:justify-center"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-6 md:absolute md:left-[16px] md:top-[6px] lg:hidden ${
          menuOpen ? "hidden" : "block"
        }`}
        onClick={toggleMenu}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-6 md:absolute md:left-[16px] md:top-[6px] lg:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
        onClick={toggleMenu}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <a className={`lg:ml-8 lg:flex ${menuOpen ? "md:hidden" : "md:block"}`}>
        <img src={WitsLogo} alt="Wits logo" className="h-auto w-14" />
      </a>

      <div
        className={`lg:flex lg:w-auto lg:flex-row lg:gap-x-16 ${menuOpen ? "md:flex md:w-[80px] md:flex-col md:gap-y-8" : "md:hidden"}`}
      >
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>景點</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  行程&體驗
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  住宿
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  美食
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}

        <a href="#" className="text-base text-green-500 hover:text-blue-900">
          景點
        </a>
        <a href="#" className="text-base text-green-500 hover:text-blue-900">
          行程&體驗
        </a>
        <a href="#" className="text-base text-green-500 hover:text-blue-900">
          住宿
        </a>
        <a href="#" className="text-base text-green-500 hover:text-blue-900">
          美食
        </a>
      </div>
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                聯絡我們
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      <a
        href="#"
        className={`text-base text-green-500 hover:text-blue-900 lg:mr-8 lg:mt-0 lg:block lg:w-auto ${menuOpen ? "md:mt-8 md:block md:w-[80px]" : "md:hidden"}`}
      >
        聯絡我們
      </a>
    </div>
  );
}
