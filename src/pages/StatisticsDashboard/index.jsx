import { fetchUserData } from "../../firebase/fetchUserData";
import { useEffect, useState } from "react";
import MemberNumberLineChart from "./MemberNumberLineChart";
import UserTimeHeatmapBar from "./UserTimeHeatmapBar";
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
    <div className="mb-10 grid min-h-[80vh] w-full grid-cols-2 flex-col items-center gap-6 p-14">
      <MemberNumberLineChart usersData={usersData} />
      <UserTimeHeatmapBar usersData={usersData} />
      <DeviceStatics usersData={usersData} />
      <SpotsClickStatistics />
    </div>
  );
}
