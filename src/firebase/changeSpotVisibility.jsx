import { db } from "./firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

/**
 * 隱藏或顯示指定景點
 * @param {string} docId - Firestore 文檔的 ID
 * @param {boolean} hiddenValue - 要設定的 hidden 欄位值 (true: 隱藏, false: 顯示)
 */
const changeSpotVisibility = async (docId, hiddenValue) => {
  try {
    const spotRef = doc(db, "spot", docId);
    await updateDoc(spotRef, {
      hidden: hiddenValue,
      isSelectedForCarousel: false,
    });
  } catch (error) {
    console.error("更改資料庫 hidden value 時發生錯誤:", error);
    throw error;
  }
};

export default changeSpotVisibility;
