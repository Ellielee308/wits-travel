import { Bar } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import { SpotsContext } from "../../components/spotsContext";
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
// 註冊 Chart.js 插件
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function SpotsClickStatistics() {
  const spots = useContext(SpotsContext);
  console.log(spots);
  const [spotData, setSpotData] = useState([]);
  useEffect(() => {
    const data = spots
      .map((spot) => ({
        spot: spot.subtitle,
        clicks: spot.click_count,
      }))
      .sort((a, b) => b.clicks - a.clicks);

    setSpotData(data);
  }, [spots]);

  const chartSpotData = {
    labels: spotData.map((item) => item.spot),
    datasets: [
      {
        label: "點擊次數",
        data: spotData.map((item) => item.clicks),
        backgroundColor: spotData.map((item) => {
          if (item.clicks > 100) return "#607B7D";
          if (item.clicks <= 30) return " #aaae8e";
          return "#E0e0e0";
        }),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `點擊次數: ${context.raw}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "景點",
        },
      },
      y: {
        title: {
          display: true,
          text: "點擊次數",
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-md border border-gray-400 p-6">
        <h1 className="text-2xl">景點點擊統計</h1>
        <div className="flex h-[300px] w-[1000px] justify-center">
          <Bar data={chartSpotData} options={options} />
        </div>
      </div>
    </div>
  );
}
