import { Link } from "react-router-dom";
export default function BackstageHeader() {
  return (
    <>
      <div className="fixed left-0 top-0 z-20 flex h-[60px] w-full transform items-center bg-white shadow-xl transition-all duration-500">
        <Link to="/" className="mx-6 mt-2 md:mx-8 md:flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Wits_logo.png"
            alt="Wits logo"
            className="mt-[-12px] h-auto w-20"
          />
        </Link>
        <h1 className="text-2xl">後台管理系統</h1>
      </div>
    </>
  );
}
