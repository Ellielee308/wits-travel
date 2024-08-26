import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchSpot = async () => {
  const spotRef = collection(db, "spot");
  const spotSnap = await getDocs(spotRef);
  const spotList = spotSnap.docs.map((doc) => doc.data());
  console.log("Fetched data inside fetchSpot:", spotList);
  return spotList;
};
