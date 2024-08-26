import { useState, useEffect } from "react";
// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
// import { Link } from "react-router-dom";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("Menu toggled:", !menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 576) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 w-full transform border border-cyan-800 transition-all duration-500 ease-in-out md:flex md:h-[60px] md:flex-row md:items-center md:justify-between ${
        menuOpen
          ? "relative flex h-screen translate-y-0 flex-col items-center justify-center overflow-hidden"
          : "relative flex h-[60px] items-center justify-center"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`absolute left-4 top-3 size-9 md:hidden ${
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
        className={`absolute left-4 top-3 size-9 md:hidden ${
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

      <a className={`md:ml-8 md:flex ${menuOpen ? "hidden" : "block"}`}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Wits_logo.png"
          alt="Wits logo"
          className="h-auto w-20"
        />
      </a>

      <div
        className={`md:flex md:w-auto md:flex-row md:gap-x-12 ${menuOpen ? "flex w-[80px] flex-col gap-y-8" : "hidden"}`}
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

        <a href="#" className="text-lg hover:text-blue-900 lg:text-xl">
          景點
        </a>
        <a href="#" className="text-lg hover:text-blue-900 lg:text-xl">
          行程
        </a>
        <a href="#" className="text-lg hover:text-blue-900 lg:text-xl">
          住宿
        </a>
        <a href="#" className="text-lg hover:text-blue-900 lg:text-xl">
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
        className={`text-lg hover:text-blue-900 md:mr-8 md:mt-0 md:block md:w-auto lg:text-xl ${menuOpen ? "mt-8 block w-[80px]" : "hidden"}`}
      >
        聯絡我們
      </a>
    </div>
  );
}
