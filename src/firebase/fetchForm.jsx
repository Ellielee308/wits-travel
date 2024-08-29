import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchForm = async () => {
  const formRef = collection(db, "form");
  const formSnap = await getDocs(formRef);
  const formList = formSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("Fetched data inside fetchForm:", formList);
  return formList;
};
