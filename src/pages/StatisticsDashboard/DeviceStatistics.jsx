import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
);

export default function DeviceStatics({ usersData }) {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    if (usersData) {
      const deviceTypeCounts = usersData.reduce((acc, user) => {
        const deviceType = user.deviceType || "Unknown";
        if (!acc[deviceType]) {
          acc[deviceType] = 0;
        }
        acc[deviceType]++;
        return acc;
      }, {});

      console.log("Device type counts:", deviceTypeCounts);

      const formattedDeviceData = Object.entries(deviceTypeCounts).map(
        ([deviceType, count]) => ({
          deviceType,
          count,
        }),
      );

      console.log("Formatted device data:", formattedDeviceData);

      setDeviceData(formattedDeviceData);
    }
  }, [usersData]);

  const chartData = {
    labels: deviceData.map((item) => item.deviceType),
    datasets: [
      {
        label: "Device Type Distribution",
        data: deviceData.map((item) => item.count),
        backgroundColor: ["#607B7D", "#E0e0e0", "#AAAE8e"],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (sum, val) => sum + val,
            0,
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: "#fff",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (sum, val) => sum + val,
              0,
            );
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center rounded-md border border-gray-400 p-6">
        <h1 className="text-2xl">裝置類型分佈</h1>
        <div className="flex h-[500px] w-[1000px] justify-center">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
DeviceStatics.propTypes = {
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      deviceType: PropTypes.string,
    }),
  ).isRequired,
};
