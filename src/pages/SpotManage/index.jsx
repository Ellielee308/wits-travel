import { useContext, useEffect, useState } from "react";
import { SpotsContext } from "../../components/spotsContext";

export default function SpotManage() {
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
    <div className="ml-48 mt-[60px] bg-white px-7 py-5 shadow-lg outline outline-1 outline-slate-600">
      <h1 className="select-none py-6 pl-6 text-2xl font-semibold text-gray-800">
        景點管理
      </h1>
      <div
        id="listContainer"
        className="flex w-full flex-col rounded shadow-md"
      >
        {/* 標題行 */}
        <div
          id="titleContainer"
          className="grid w-full grid-cols-7 justify-items-center border-b bg-gray-100 px-4 py-2 font-semibold"
        >
          <div className="justify-self-start">照片</div>
          <div className="col-span-2 justify-self-start">標題</div>
          <div>標價</div>
          <div>瀏覽次數</div>
          <div>類別</div>
          <div>操作</div>
        </div>
        {/* 內容行 */}
        {spots.map((spot, index) => {
          return (
            <div
              key={spot.id}
              className={`grid grid-cols-7 items-center justify-items-center px-4 py-2 ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
            >
              <img
                className="h-20 w-20 justify-self-start rounded object-cover"
                src={spot.main_img}
                alt={spot.subtitle}
              />
              <div className="col-span-2 justify-self-start text-sm">
                {spot.title}
              </div>
              <div className="text-sm">NT{formatCurrency(spot.price)}</div>
              <div className="text-sm">{spot.click_count}次</div>
              <div className="text-sm">{spot.spot_category}</div>
              <div className="flex items-center justify-center">
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
