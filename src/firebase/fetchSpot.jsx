import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchSpot = async () => {
  const spotRef = collection(db, "spot");
  const spotSnap = await getDocs(spotRef);

  // 正确获取每个文档的ID并将其附加到数据中
  const spotList = spotSnap.docs.map((doc) => ({
    docId: doc.id, // 手动添加 docId
    ...doc.data(), // 获取文档的其他数据
  }));

  console.log("Fetched data inside fetchSpot:", spotList);
  return spotList;
};
