import { Bar } from "react-chartjs-2";

function UserTimeHeatmapBar({ usersData }) {
  const interactionCounts = {};

  usersData.forEach((user) => {
    if (user.interactions) {
      Object.values(user.interactions).forEach((interaction) => {
        const timestamp = interaction.enter_timestamp;
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
        );

        const hour = date.getHours();

        if (!interactionCounts[hour]) {
          interactionCounts[hour] = 0;
        }
        interactionCounts[hour] += 1;
      });
    }
  });

  const chartData = {
    labels: Object.keys(interactionCounts).map((hour) => `${hour}:00`),
    datasets: [
      {
        label: "不同時段之點擊次數",
        data: Object.values(interactionCounts),
        backgroundColor: Object.values(interactionCounts).map((count) => {
          if (count >= 0 && count <= 3) return "#E0e0e0";
          if (count >= 4 && count <= 6) return "#aaae8e";
          if (count >= 7) return "#607B7D";
        }),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "時間點",
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
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false, // 確保數字不會顯示
      },
    },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center rounded-md border border-gray-200 p-6">
        <h1 className="text-2xl">熱門點擊時段</h1>
        <div className="flex h-[30vh] w-auto justify-center">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default UserTimeHeatmapBar;
