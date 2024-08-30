import { useState, useEffect, useContext } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { SpotsContext } from "@/components/spotsContext";

export default function CarouselManage() {
  const db = getFirestore();
  const spots = useContext(SpotsContext);
  const [selectedSpots, setSelectedSpots] = useState([]);
  const [intervalTime, setIntervalTime] = useState(5000);

  useEffect(() => {
    if (spots.length > 0) {
      console.log("Loaded spots:", spots);
      const selected = spots.filter((spot) => spot.isSelectedForCarousel);
      setSelectedSpots(selected.map((spot) => spot.id));
      if (selected.length > 0 && selected[0].carouselInterval) {
        setIntervalTime(selected[0].carouselInterval);
      }
    }
  }, [spots]);

  const handleSpotSelect = (spotId) => {
    setSelectedSpots((prevSelected) =>
      prevSelected.includes(spotId)
        ? prevSelected.filter((id) => id !== spotId)
        : [...prevSelected, spotId],
    );
  };
  useEffect(() => {
    console.log("Loaded spots:", spots);
  }, [spots]);

  const handleSave = async () => {
    if (selectedSpots.length === 0) {
      alert("請至少選擇一張圖片！");
      return;
    }
    try {
      for (let spotId of selectedSpots) {
        const spot = spots.find((s) => s.id === spotId);
        if (!spot || !spot.docId) {
          console.error("文檔 ID 未找到");
          continue;
        }
        const spotRef = doc(db, "spot", spot.docId);
        const docSnap = await getDoc(spotRef);
        if (docSnap.exists()) {
          console.log(`Updating spot ID: ${spot.docId}`);
          await updateDoc(spotRef, {
            isSelectedForCarousel: true,
            carouselInterval: intervalTime,
          });
        } else {
          console.error("文檔不存在:", spot.docId);
        }
      }
      for (let spot of spots) {
        if (!selectedSpots.includes(spot.id) && spot.docId) {
          const spotRef = doc(db, "spot", spot.docId);
          const docSnap = await getDoc(spotRef);

          if (docSnap.exists()) {
            console.log(`Updating spot ID: ${spot.docId} to false`);

            await updateDoc(spotRef, {
              isSelectedForCarousel: false,
              carouselInterval: intervalTime,
            });
          } else {
            console.error("文檔不存在:", spot.docId);
          }
        }
      }
      alert("更新成功！");
    } catch (error) {
      console.error("儲存設定時出錯:", error);
      alert("儲存時發生錯誤，請稍後再試！");
    }
  };

  return (
    <div className="w-4/5 p-8">
      <h1 className="mb-4 text-2xl font-bold">編輯輪播圖</h1>
      <div className="mb-4">
        <h2 className="mb-2 text-xl">選擇要展示的圖片</h2>
        <div className="grid grid-cols-3 gap-4">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className={`cursor-pointer rounded border p-2 ${
                selectedSpots.includes(spot.id)
                  ? "border-2 border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => handleSpotSelect(spot.id)}
            >
              <img
                src={spot.main_img}
                alt={spot.title}
                className="mb-2 h-32 w-full object-cover"
              />
              <p className="text-center">{spot.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="mb-2 text-xl">設置輪播時間（秒）</h2>
        <input
          type="number"
          value={intervalTime / 1000}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 1 || value > 10) {
              alert("請輸入 1 到 10 之間的數值！");
            } else {
              setIntervalTime(Number(e.target.value * 1000));
            }
          }}
          className="w-full rounded border p-2"
          min={1}
          max={10}
        />
      </div>

      <button
        onClick={handleSave}
        className="rounded bg-[#006C98] px-4 py-2 text-white"
      >
        儲存設置
      </button>
    </div>
  );
}
