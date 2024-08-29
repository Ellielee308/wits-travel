import { fetchUserData } from "../../firebase/fetchUserData";
import { useEffect, useState } from "react";
import DeviceStatics from "./DeviceStatistics";
import SpotsClickStatistics from "./SpotsClickStatistics";

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
    <div className="mb-10 flex min-h-[80vh] flex-col items-center gap-6">
      <DeviceStatics usersData={usersData} />
      <SpotsClickStatistics />
    </div>
  );
}
