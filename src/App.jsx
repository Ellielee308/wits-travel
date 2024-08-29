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
  function getBrowserInfo() {
    const userAgent = navigator.userAgent;

    if (
      /Chrome/.test(userAgent) &&
      !/Edge/.test(userAgent) &&
      !/OPR/.test(userAgent)
    ) {
      return "Google Chrome";
    } else if (/Firefox/.test(userAgent)) {
      return "Mozilla Firefox";
    } else if (
      /Safari/.test(userAgent) &&
      !/Chrome/.test(userAgent) &&
      !/Edge/.test(userAgent)
    ) {
      return "Apple Safari";
    } else if (/Edg/.test(userAgent)) {
      return "Microsoft Edge";
    } else if (/MSIE/.test(userAgent) || /Trident/.test(userAgent)) {
      return "Internet Explorer";
    } else if (/Opera/.test(userAgent)) {
      return "Opera";
    } else {
      return "Unknown Browser";
    }
  }

  function getDeviceType() {
    const userAgent = navigator.userAgent;
    const width = window.innerWidth;

    if (/mobile/i.test(userAgent) && width <= 768) {
      return "Mobile";
    } else if (/tablet/i.test(userAgent) || (width > 768 && width <= 1024)) {
      return "Tablet";
    } else if (/desktop/i.test(userAgent) || width > 1024) {
      return "Desktop";
    } else {
      return "Unknown Device";
    }
  }

  useEffect(() => {
    const deviceType = getDeviceType();
    const browserInfo = getBrowserInfo();

    getId(installations).then(async (installationId) => {
      console.log("Firebase Installation ID:", installationId);

      const userDocRef = doc(db, "users", installationId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          installationId,
          deviceType,
          browserInfo,
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
