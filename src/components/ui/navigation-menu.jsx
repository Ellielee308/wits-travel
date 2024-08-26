import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./YourComponentFilePath";

const MyNavigationMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu Item 1</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/link1">Link 1</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu Item 2</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/link2">Link 2</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export default MyNavigationMenu;
