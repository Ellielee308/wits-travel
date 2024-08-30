import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchUserData = async () => {
  const usersRef = collection(db, "users");
  const usersSnap = await getDocs(usersRef);
  const usersDataList = usersSnap.docs.map((doc) => doc.data());
  console.log("Fetched data inside fetchUser:", usersDataList);
  return usersDataList;
};
