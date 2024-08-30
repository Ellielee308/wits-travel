// import PropTypes from "prop-types";
// import { Scatter } from "react-chartjs-2";
// import "chart.js/auto";

// const UserStayDuration = ({ usersData }) => {
//   const dataPoints = [];
//   let completeDataCount = 0; // 記錄完整資料的數量ji

//   usersData.forEach((user) => {
//     if (user.interactions) {
//       Object.values(user.interactions).forEach((interaction) => {
//         // 檢查是否有離開時間
//         if (interaction.enter_timestamp && interaction.leave_timestamp) {
//           const enterTimeInMilliseconds =
//             interaction.enter_timestamp.seconds * 1000 +
//             interaction.enter_timestamp.nanoseconds / 1000000;
//           const leaveTimeInMilliseconds =
//             interaction.leave_timestamp.seconds * 1000 +
//             interaction.leave_timestamp.nanoseconds / 1000000;
//           const stayDurationInSeconds =
//             (leaveTimeInMilliseconds - enterTimeInMilliseconds) / 1000;

//           dataPoints.push({
//             x: enterTimeInMilliseconds, // 使用毫秒作為x軸值
//             y: stayDurationInSeconds, // 停留時間以秒為單位
//           });

//           completeDataCount += 1; // 完整資料數量加一
//         }
//       });
//     }
//   });

//   console.log(`Total complete interactions: ${completeDataCount}`);

//   const data = {
//     datasets: [
//       {
//         label: "User Interactions",
//         data: dataPoints,
//         backgroundColor: "rgba(75, 192, 192, 1)",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: "linear",
//         title: {
//           display: true,
//           text: "Hour of Day (24hr)",
//         },
//         ticks: {
//           callback: function (value, index, values) {
//             const date = new Date(value);
//             return (
//               date.getHours() +
//               ":" +
//               date.getMinutes().toString().padStart(2, "0")
//             );
//           },
//           stepSize: 3600000,
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Stay Duration (seconds)",
//         },
//         ticks: {
//           stepSize: 1,
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Scatter data={data} options={options} />;
// };

// UserTimeHeatmap.propTypes = {
//   usersData: PropTypes.arrayOf(
//     PropTypes.shape({
//       installationId: PropTypes.string.isRequired,
//       interactions: PropTypes.objectOf(
//         PropTypes.objectOf(
//           PropTypes.shape({
//             enter_timestamp: PropTypes.shape({
//               seconds: PropTypes.number.isRequired,
//               nanoseconds: PropTypes.number.isRequired,
//             }),
//             leave_timestamp: PropTypes.shape({
//               seconds: PropTypes.number.isRequired,
//               nanoseconds: PropTypes.number.isRequired,
//             }),
//           }),
//         ),
//       ).isRequired,
//     }),
//   ).isRequired,
// };

// export default UserStayDuration;
