import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function addSpot(data) {
  try {
    const docRef = await addDoc(collection(db, "spot"), data);
    console.log("Successfully added a new spot, document ID:", docRef.id);
  } catch (error) {
    console.error("Error adding spot: ", error);
  }
}
