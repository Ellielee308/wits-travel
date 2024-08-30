import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const editSpot = async (docId, data) => {
  try {
    const spotRef = doc(db, "spot", docId);
    await updateDoc(spotRef, data);
    console.log("景點資料更新成功");
  } catch (error) {
    console.error("更新景點資料時發生錯誤: ", error);
  }
};

export default editSpot;
