import { createContext, useState, useEffect } from "react";
import { listenToSpotChanges } from "@/firebase/fetchSpot";
import PropTypes from "prop-types";

export const SpotsContext = createContext();

export const SpotsProvider = ({ children }) => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToSpotChanges((data) => {
      console.log("Realtime data inside SpotsProvider:", data);
      setSpots(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <SpotsContext.Provider value={spots}>{children}</SpotsContext.Provider>
  );
};

SpotsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// import { createContext, useState, useEffect } from "react";
// import { fetchSpot } from "@/firebase/fetchSpot";
// import PropTypes from "prop-types";

// export const SpotsContext = createContext();

// export const SpotsProvider = ({ children }) => {
//   const [spots, setSpots] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchSpot();
//         console.log("Fetched data inside getData:", data);
//         setSpots(data);
//       } catch (error) {
//         console.error("Error fetching spots:", error);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <SpotsContext.Provider value={spots}>{children}</SpotsContext.Provider>
//   );
// };

// SpotsProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
