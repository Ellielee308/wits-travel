import { Outlet, useLocation } from "react-router-dom";
import BackstageHeader from "./components/BackstageHeader";
import BackstageNav from "./components/BackstageNav";
import Footer from "./components/Footer";

function Backstage() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/backstage/login";

  return (
    <>
      <BackstageHeader />
      {!isLoginPage && <BackstageNav />}
      {/* 如果不是登入頁面，顯示 BackstageNav */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Backstage;
