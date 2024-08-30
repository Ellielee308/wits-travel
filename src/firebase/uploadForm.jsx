import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitContactForm = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "form"), {
      ...data,
      created_timestamp: serverTimestamp(),
    });
    console.log("Form submitted successfully, document ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
