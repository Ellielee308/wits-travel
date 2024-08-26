import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SpotsContext } from "../../components/spotsContext";
import disneyLand from "../../../public/tokyo-disneyland.jpg";

export default function Spot() {
  const spots = useContext(SpotsContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [spot, setSpot] = useState(null);
  const navigate = useNavigate(); // 初始化 useNavigate hook

  useEffect(() => {
    if (spots.length > 0) {
      const currentSpot = spots.find((spot) => spot.id === id);
      if (currentSpot) {
        setSpot(currentSpot);
        console.log(currentSpot);
      } else {
        console.log("景點不存在");
        alert("Oops，景點不存在！");
        navigate("/");
      }
    }
  }, [spots, id, navigate]);

  return (
    <div className="px-6 py-6 xl:mx-auto xl:w-[1200px]">
      <div className="imageContainer flex w-full flex-col items-center rounded-lg shadow-lg md:h-[500px]">
        <img
          src={disneyLand}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div id="productInfo" className="flex flex-col py-6 lg:flex-row">
        <div id="productTextContainer" className="lg:mr-4 lg:w-[70%]">
          <div className="mb-6 flex flex-row items-start justify-between">
            <h1 className="pr-9 text-xl font-semibold md:text-2xl">
              日本｜東京迪士尼度假區｜Tokyo Disney Resort
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.1"
              stroke="currentColor"
              className="inline-block h-auto w-[48px] align-middle text-gray-600 transition-colors duration-700 ease-in-out hover:cursor-pointer hover:fill-[#006c98] hover:text-[#006c98] md:h-9 md:w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <div className="mb-4 flex flex-row items-center text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p>日本 - 東京, 千葉</p>
          </div>
          <hr className="w-full" />
          <div className="flex w-full flex-row py-6 text-gray-900">
            <div className="flex flex-row pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-3 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
                />
              </svg>
              <p>15天前可免費取消</p>
            </div>
            <div className="flex flex-row pr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-3 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <p>電子票</p>
            </div>
          </div>
          <hr className="w-full" />
          <div className="my-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl">
              景點介紹
            </h2>
            <div className="text-base text-gray-600">
              <ul>
                <li>
                  東京迪士尼度假區介紹
                  <br />
                  東京迪士尼度假區是ㄧ座擁有多家設施的大型主題度假區。包括「東京迪士尼樂園」、「東京迪士尼海洋」這兩座風格各異的迪士尼主題樂園、三家迪士尼飯店、多家官方飯店、ㄧ座綜合型商業設施「伊克斯皮兒莉」以及環繞度假區運行的便捷單軌電車等。不僅能為廣大遊客提供暢遊園區的歡樂體驗，同時透過住宿服務讓遊客得到購物、美食等多元化的度假體驗。
                </li>
                <br />
                <li>
                  東京迪士尼樂園
                  <br />
                  東京迪士尼樂園包含七個主題區：
                  <br />
                  ・世界市集：大街兩旁維多利亞時代的建築鱗萃比櫛，優美典雅。20世紀初期，華特・迪士尼出生並成長的美國將以溫馨氛圍迎接您的到來。
                  <br />
                  ・明日樂園：在這座率先實現人類夢想的城市，您可體驗遨遊宇宙之旅。
                  <br />
                  ・卡通城：米奇和他的夥伴們生活在這個快樂無比的小城。
                  <br />
                  ・夢幻樂園：夢想成真的童話王國。有新開幕的美女與野獸及白雪公主、小飛俠和小熊維尼等耳熟能詳的童話世界主人公帶您踏上充滿魔法的冒險之旅。
                  <br />
                  在驚喜不斷的七個主題園區，您可以乘坐遊樂設施、觀賞娛樂表演，還可以與您最喜愛的迪士尼明星合影，無盡的歡樂正等待著您！
                </li>
              </ul>
            </div>
          </div>
          <hr className="w-full" />
          <div className="my-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl">
              交通方式
            </h2>
            <p className="text-gray-600">
              由東京車站搭乘電車僅需 15 分鐘車程，即可抵達東京迪士尼樂園。
              <br />
              除了電車之外，您亦可搭乘直達巴士由各地區、各飯店蒞臨園區。
            </p>
          </div>
        </div>
        <div
          id="orderContainer"
          className="mt-10 flex flex-col rounded border-[1px] border-gray-200 px-3 shadow-md lg:mt-0 lg:w-[30%] lg:self-start"
        >
          <div className="mb-3 mt-5">
            <span className="mr-2 text-2xl">NT$1,851</span>
            <span>起</span>
          </div>
          <Button className="mb-3 self-stretch bg-[#006c98] py-6 text-lg hover:bg-[#1679a0]">
            訂購門票
          </Button>
          <Link to="/contacts">
            <div
              id="customerService"
              className="mb-3 flex flex-row text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <p>有疑問嗎？聯絡客服</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
