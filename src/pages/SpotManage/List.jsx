import { useContext } from "react";
import { SpotsContext } from "../../components/spotsContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Details from "./Details";

export default function List({ detailsVisibility, setDetailsVisibility }) {
  const spots = useContext(SpotsContext);

  function formatCurrency(number) {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(number);
  }
  const toggleDetails = (id) => {
    setDetailsVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 切換指定景點的顯示狀態
    }));
  };
  //第一次切換操作：當 toggleDetails(id) 被調用時，prevState 會是 {}。prevState[id] 此時是 undefined。在切換的操作中，!prevState[id] 會是 true（因為 !undefined 是 true）。setDetailsVisibility 更新狀態時會把 id 的值設為 true。

  if (!spots) {
    return (
      <div className="flex h-screen items-center justify-center">加載中…</div>
    );
  }
  return (
    <div
      id="listContainer"
      className="flex w-full flex-col rounded-lg shadow-md"
    >
      {/* 標題行 */}
      <div
        id="titleContainer"
        className="sticky top-[60px] z-10 grid w-full grid-cols-7 justify-items-center rounded-t-lg border-b bg-gray-200 px-4 py-2 font-semibold"
      >
        <div className="justify-self-start">照片</div>
        <div className="col-span-2 ml-1 justify-self-start">標題</div>
        <div>價格</div>
        <div>瀏覽次數</div>
        <div>類別</div>
        <div>操作</div>
      </div>
      {/* 內容行 */}
      {spots.map((spot) => {
        return (
          <div
            key={spot.id}
            className={`grid grid-cols-7 ${detailsVisibility[spot.id] ? "grid-rows-[auto_auto]" : null} items-center justify-items-center px-4 py-2 last:rounded-b-lg odd:bg-gray-200 even:bg-gray-100`}
          >
            <img
              className="h-20 w-20 justify-self-start rounded object-cover"
              src={spot.main_img}
              alt={spot.subtitle}
            />
            <div className="col-span-2 ml-1 justify-self-start text-sm transition-colors duration-200 hover:text-blue-600">
              <Link to={`/spot?id=${spot.id}`} target="_blank">
                {spot.title}
              </Link>
            </div>
            <div className="text-sm">NT{formatCurrency(spot.price)}</div>
            <div className="text-sm">{spot.click_count}次</div>
            <div className="text-sm">{spot.spot_category}</div>
            <div className="flex flex-row justify-around justify-self-stretch">
              <svg
                id="toggle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`h-6 w-6 transform cursor-pointer text-gray-600 transition-transform duration-700 hover:text-gray-800 ${detailsVisibility[spot.id] ? "rotate-180" : "rotate-0"}`}
                onClick={() => {
                  toggleDetails(spot.id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
              <svg
                id="edit"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <svg
                id="hide"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </div>
            {detailsVisibility[spot.id] && <Details spot={spot} />}
          </div>
        );
      })}
    </div>
  );
}

List.propTypes = {
  detailsVisibility: PropTypes.bool,
  setDetailsVisibility: PropTypes.func,
};
