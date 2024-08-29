import { useContext } from "react";
import { SpotsContext } from "../../components/spotsContext";
import { Link } from "react-router-dom";
import Details from "./Details";

export default function List() {
  const spots = useContext(SpotsContext);

  function formatCurrency(number) {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(number);
  }

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
        className="sticky top-[60px] grid w-full grid-cols-7 justify-items-center rounded-t-lg border-b bg-gray-200 px-4 py-2 font-semibold"
      >
        <div className="justify-self-start">照片</div>
        <div className="col-span-2 ml-1 justify-self-start">標題</div>
        <div>標價</div>
        <div>瀏覽次數</div>
        <div>類別</div>
        <div>操作</div>
      </div>
      {/* 內容行 */}
      {spots.map((spot) => {
        return (
          <div
            key={spot.id}
            className="grid grid-cols-7 items-center justify-items-center px-4 py-2 last:rounded-b-lg odd:bg-gray-200 even:bg-gray-100"
          >
            <img
              className="h-20 w-20 justify-self-start rounded object-cover"
              src={spot.main_img}
              alt={spot.subtitle}
            />
            <div className="col-span-2 ml-1 justify-self-start text-sm">
              <Link to={`/spot?id=${spot.id}`}>{spot.title}</Link>
            </div>
            <div className="text-sm">NT{formatCurrency(spot.price)}</div>
            <div className="text-sm">{spot.click_count}次</div>
            <div className="text-sm">{spot.spot_category}</div>
            <div className="flex flex-row justify-around justify-self-stretch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 transform cursor-pointer text-gray-600 transition-transform duration-500 hover:text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
              <svg
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
            </div>
            <Details spot={spot} />
          </div>
        );
      })}
    </div>
  );
}
