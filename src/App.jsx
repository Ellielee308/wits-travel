import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { db, installations } from "./firebase/firebaseConfig";
import { getId } from "firebase/installations";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

function App() {
  useEffect(() => {
    getId(installations).then(async (installationId) => {
      console.log("Firebase Installation ID:", installationId);

      const userDocRef = doc(db, "users", installationId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          installationId: installationId,

          first_time_entry: serverTimestamp(),
        });
        console.log("First time entry stored in Firestore");
      } else {
        console.log(
          "User has visited before, no need to update first_time_entry",
        );
      }

      // 記錄進入頁面的時間
      const interactionsCollectionRef = collection(userDocRef, "interactions");
      const interactionDocRef = doc(interactionsCollectionRef);

      setDoc(interactionDocRef, {
        event: "page_interaction",
        page_title: document.title,
        enter_timestamp: serverTimestamp(),
      })
        .then(() => {
          console.log("Enter time stored in Firestore with auto-generated ID");
        })
        .catch((error) => {
          console.error("Error storing enter time: ", error);
        });

      // 監聽用戶離開頁面的事件
      const handleBeforeUnload = () => {
        setDoc(
          interactionDocRef,
          {
            leave_timestamp: serverTimestamp(),
          },
          { merge: true },
        )
          .then(() => {
            console.log("Leave time stored in Firestore");
          })
          .catch((error) => {
            console.error("Error storing leave time: ", error);
          });
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
