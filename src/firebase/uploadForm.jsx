import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const submitContactForm = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "form"), data);
    console.log("Form submitted successfully, document ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
