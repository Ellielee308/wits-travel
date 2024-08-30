import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const listenToSpotChanges = (onDataChange) => {
  const spotRef = collection(db, "spot");

  const unsubscribe = onSnapshot(spotRef, (snapshot) => {
    const spotList = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    console.log("Realtime data inside listenToSpotChanges:", spotList);
    onDataChange(spotList);
  });
  return unsubscribe;
};

// import { db } from "./firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

// export const fetchSpot = async () => {
//   const spotRef = collection(db, "spot");
//   const spotSnap = await getDocs(spotRef);

//   const spotList = spotSnap.docs.map((doc) => ({
//     docId: doc.id,
//     ...doc.data(),
//   }));

//   console.log("Fetched data inside fetchSpot:", spotList);
//   return spotList;
// };
