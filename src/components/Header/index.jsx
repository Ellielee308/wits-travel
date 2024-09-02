import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  const components = [
    { spot_category: "歷史景點", href: "/category?category=history" },
    { spot_category: "樂園", href: "/category?category=theme-park" },
    { spot_category: "特色建築", href: "/category?category=architecture" },
    { spot_category: "博物館 & 美術館", href: "/category?category=museum" },
    { spot_category: "自然風景", href: "/category?category=nature" },
  ];
  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    console.log(`Selected category: ${category}`);
  };

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleCategoryClickContent = (category) => {
    console.log("Selected category:", category);
    setIsMenuVisible(false);
  };
  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-20 w-full transform shadow-xl transition-all duration-500 ease-in-out md:flex md:h-[60px] md:flex-row md:items-center md:justify-between ${
        menuOpen
          ? "relative flex h-screen translate-y-0 flex-col items-center justify-center overflow-hidden"
          : "relative flex h-[72px] items-center justify-center"
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

      <Link
        to="/"
        className={`mt-[-8px] md:ml-8 md:flex ${menuOpen ? "hidden" : "block"}`}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Wits_logo.png"
          alt="Wits logo"
          className="h-auto w-20"
        />
      </Link>

      <NavigationMenu>
        <NavigationMenuList
          className={`md:flex md:w-auto md:flex-row ${menuOpen ? "flex w-[80px] flex-col gap-y-8" : "hidden"}`}
        >
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="ml-[16px] text-lg"
              onMouseEnter={handleMouseEnter}
            >
              景點
            </NavigationMenuTrigger>
            {isMenuVisible && (
              <NavigationMenuContent>
                <ul className="flex flex-col gap-y-4 whitespace-nowrap p-4">
                  {components.map((component) => (
                    <li
                      key={component.spot_category}
                      className="cursor-pointer rounded-md hover:bg-stone-100 hover:text-stone-900"
                    >
                      <Link
                        to={component.href}
                        className="block"
                        onClick={() => {
                          handleCategoryClickContent(component.spot_category);
                          handleCategoryClick(component.spot_category);
                        }}
                      >
                        {component.spot_category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="text-[18px]">行程</div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="text-[18px]">住宿</div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="text-[18px]">美食</div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem
            className={`rounded-[0.375rem] px-4 py-2 text-lg text-[#006c98] transition-all duration-300 hover:bg-[#006c98] hover:text-white md:mr-8 md:mt-0 md:block md:w-auto lg:text-lg ${menuOpen ? "mt-9 block" : "hidden"}`}
          >
            <Link to="/contacts" legacyBehavior passHref>
              <NavigationMenuLink className="whitespace-nowrap">
                聯絡我們
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
