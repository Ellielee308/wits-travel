import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchUserData = async () => {
  const usersRef = collection(db, "users");
  const usersSnap = await getDocs(usersRef);
  const usersDataList = [];

  for (const userDoc of usersSnap.docs) {
    const userData = userDoc.data();
    const userId = userDoc.id;

    const interactionsRef = collection(db, "users", userId, "interactions");
    const interactionsSnap = await getDocs(interactionsRef);
    const interactionsData = interactionsSnap.docs.map((interactionDoc) =>
      interactionDoc.data(),
    );

    userData.interactions = interactionsData;

    usersDataList.push(userData);
  }

  return usersDataList;
};
