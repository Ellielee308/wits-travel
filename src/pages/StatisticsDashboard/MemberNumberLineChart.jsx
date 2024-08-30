import { useRef } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const MemberNumberLineChart = ({ usersData }) => {
  const figRef = useRef(null);

  const dateCount = {};

  usersData.forEach((user) => {
    const timestamp =
      user.first_time_entry.seconds * 1000 +
      user.first_time_entry.nanoseconds / 1000000;
    const date = new Date(timestamp).toLocaleDateString();

    if (dateCount[date]) {
      dateCount[date] += 1;
    } else {
      dateCount[date] = 1;
    }
  });

  const labels = Object.keys(dateCount).sort(
    (a, b) => new Date(a) - new Date(b),
  );
  let cumulativeCount = 0;
  const dataPoints = labels.map((date) => {
    cumulativeCount += dateCount[date];
    return cumulativeCount;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "累積使用者數量",
        data: dataPoints,
        fill: false,
        borderColor: "#AAAE8e",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "首次進入日期",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "累積使用者數量",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleDownload = () => {
    const fig = figRef.current;
    if (fig) {
      const link = document.createElement("a");
      link.href = fig.toBase64Image();
      link.download = "chart.png";
      link.click();
    }
  };

  return (
    <div className="justify-text-center flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center rounded-md border border-gray-200 p-6">
        <h1 className="text-2xl">初訪使用者累積人次</h1>
        <div className="flex h-[30vh] w-full justify-center">
          <Line ref={figRef} data={data} options={options} />
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 rounded bg-[#aaae8ec2] px-4 py-2 text-white hover:bg-[#AAAE8e]"
        >
          下載圖表圖片
        </button>
      </div>
    </div>
  );
};

MemberNumberLineChart.propTypes = {
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      first_time_entry: PropTypes.shape({
        seconds: PropTypes.number.isRequired,
        nanoseconds: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default MemberNumberLineChart;
