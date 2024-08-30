import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default async function addSpot(data) {
  try {
    const docRef = await addDoc(collection(db, "spot"), data);
    console.log("Successfully added a new spot, document ID:", docRef.id);
    await updateDoc(doc(db, "spot", docRef.id), { id: docRef.id });
    console.log("Successfully updated spot with ID field:", docRef.id);
  } catch (error) {
    console.error("Error adding spot: ", error);
  }
}
