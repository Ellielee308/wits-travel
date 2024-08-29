import { fetchUserData } from "../../firebase/fetchUserData";
import { useEffect, useState } from "react";
import MemberNumberLineChart from "./MemberNumberLineChart";

export default function StatisticsDashboard() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const usersDataList = await fetchUserData();
        console.log("Fetched users data:", usersDataList);
        setUsersData(usersDataList);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    getUsersData();
  }, []);

  return (
    <>
      <h1>這是圖表頁</h1>
      <MemberNumberLineChart usersData={usersData} />
    </>
  );
}
