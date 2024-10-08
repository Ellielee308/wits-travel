import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SpotsContext } from "../../components/spotsContext";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Map from "./Map";
import PhotoPreview from "./PhotoPreview";
const categoryLabel = {
  自然風景: "nature",
  "博物館 & 美術館": "museum",
  樂園: "theme-park",
  歷史景點: "history",
  特色建築: "architecture",
};
import loadingGif from "../../components/loading.gif";

export default function Spot() {
  const spots = useContext(SpotsContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [spot, setSpot] = useState(null);
  const navigate = useNavigate(); // 初始化 useNavigate hook
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [photos, setPhotos] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isSpotSaved, setIsSpotSaved] = useState(false);
  const [isJumping, setIsJumping] = useState(false); // 控制跳躍效果

  const handleClickSave = () => {
    setIsSpotSaved(!isSpotSaved);
    setIsJumping(true);
    // 停止動畫效果
    setTimeout(() => {
      setIsJumping(false);
    }, 300);
  };

  useEffect(() => {
    console.log("Hi");
    if (spots.length > 0) {
      const currentSpot = spots.find((spot) => spot.id === id);
      if (currentSpot && !currentSpot.hidden) {
        setSpot(currentSpot);
        console.log(currentSpot);
        const currentPhotos = [currentSpot.main_img, ...currentSpot.img];
        console.log(currentPhotos);
        setPhotos(currentPhotos);
      } else {
        console.log("景點不存在");
        alert("Oops，景點不存在！");
        navigate("/");
      }
    }
  }, [spots, id, navigate]);

  //Render後頁面到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function formatCurrency(number) {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
    }).format(number);
  }

  useEffect(() => {
    const updateClickCount = async () => {
      try {
        const docRef = doc(db, "spot", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          await updateDoc(docRef, {
            click_count: increment(1),
          });
          console.log("Click count updated successfully.");
        } else {
          console.error("No document found with the given id.");
        }
      } catch (error) {
        console.error("Error updating click count: ", error);
      }
    };

    updateClickCount();
  }, [id]);

  //預覽圖片功能
  const handlePhotoClick = (index) => {
    setCurrentPhotoIndex(index);
    setIsPreviewOpen(true);
  };

  const handleNextPhoto = () => {
    const imagesNumber = photos.length;
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === imagesNumber - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  if (!spot) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-2xl text-[#006c98]">
        <img src={loadingGif} className="my-6"></img>
        Loading...
      </div>
    );
  }
  return (
    <div className="px-6 py-6 xl:mx-auto xl:w-[1200px]">
      <div className="group relative flex w-full flex-row gap-2 rounded-lg md:h-[500px]">
        <div className="w-full md:w-[70%]">
          <img
            src={photos[0]}
            onClick={() => handlePhotoClick(0)}
            className="h-full w-full rounded-lg object-cover opacity-100 shadow-lg transition-all duration-500 ease-in-out hover:cursor-pointer group-hover:opacity-70 hover:group-hover:opacity-100"
          />
        </div>
        <div className="hidden w-[30%] flex-col gap-2 md:flex">
          <img
            src={photos[1]}
            onClick={() => handlePhotoClick(1)}
            className="h-1/2 w-full rounded-lg object-cover opacity-100 shadow-lg transition-all duration-500 ease-in-out hover:cursor-pointer group-hover:opacity-70 hover:group-hover:opacity-100"
          />
          <img
            src={photos[2]}
            onClick={() => handlePhotoClick(2)}
            className="h-1/2 w-full rounded-lg object-cover opacity-100 shadow-lg transition-all duration-500 ease-in-out hover:cursor-pointer group-hover:opacity-70 hover:group-hover:opacity-100"
          />
        </div>
        <div
          id="photoNumberBox"
          className="absolute bottom-2 right-2 flex select-none flex-row items-center justify-center gap-1 rounded-xl bg-gray-900 bg-opacity-60 px-2 text-sm text-white hover:cursor-pointer md:bottom-4 md:right-4 md:text-base"
          onClick={() => handlePhotoClick(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>{photos.length}</p>
        </div>
      </div>
      <div id="productInfo" className="flex flex-col py-6 lg:flex-row">
        <div id="productTextContainer" className="lg:mr-4 lg:w-[70%]">
          <div className="mb-6 flex flex-row items-start justify-between">
            <h1 className="pr-9 text-xl font-semibold md:text-2xl">
              {spot.title}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isSpotSaved ? "#006c98" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.1"
              stroke="currentColor"
              className={`inline-block h-auto w-[48px] align-middle text-gray-600 transition-all duration-300 hover:cursor-pointer hover:fill-[#006c98] hover:text-[#006c98] md:h-9 md:w-9 ${
                isJumping ? "animate-jump" : ""
              }`}
              onClick={handleClickSave}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <div className="flex flex-row">
            <div className="mb-4 mr-3 flex flex-row items-center text-sm text-gray-500">
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
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              <Link
                to={`/category?category=${categoryLabel[spot.spot_category]}`}
                className="transition-colors duration-300 hover:text-gray-900"
              >
                {spot.spot_category}
              </Link>
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
              <p className="select-none">{`${spot.country} - ${spot.city}`}</p>
            </div>
          </div>
          <hr className="w-full" />
          <div className="flex w-full flex-row py-6 text-gray-700">
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
              <p>免手續費</p>
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <p>可預約旅拍</p>
            </div>
          </div>
          <hr className="w-full" />
          <div className="my-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl">
              景點介紹
            </h2>
            <div className="whitespace-pre-wrap text-justify text-base text-gray-600">
              {spot.description}
            </div>
          </div>
          <hr className="w-full" />
          <div className="my-4">
            <h2 className="mb-4 text-lg font-bold text-gray-900 md:text-xl">
              交通方式
            </h2>
            <p className="whitespace-pre-wrap text-justify text-gray-600">
              {spot.transportation}
            </p>
          </div>
          {/*map*/}
          <hr className="w-full" />
          <div className="flex flex-col p-6">
            {/* 傳遞 spot 給 Map 組件 */}
            <Map apiKey={apiKey} spot={spot} />
          </div>
        </div>
        <div
          id="orderContainer"
          className="mt-10 flex flex-col rounded border-[1px] border-gray-200 px-3 shadow-md lg:sticky lg:top-[30%] lg:mt-0 lg:w-[30%] lg:self-start"
        >
          <div className="mb-3 mt-5">
            <span className="mr-2 text-2xl">
              NT{formatCurrency(spot.price)}
            </span>
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
      {isPreviewOpen && (
        <PhotoPreview
          photos={photos}
          currentIndex={currentPhotoIndex}
          onClose={() => setIsPreviewOpen(false)}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </div>
  );
}
