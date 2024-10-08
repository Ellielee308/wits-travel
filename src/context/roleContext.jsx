import { createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import PropTypes from "prop-types";

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "admins", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role);
        } else {
          console.error("無法獲取管理者資訊");
          setRole(null); // 設置為 null 以防萬一
        }
      } else {
        setRole(null); // 如果用戶登出或未登入，設置為 null
      }
    });

    return () => unsubscribe();
  }, [auth]);
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
