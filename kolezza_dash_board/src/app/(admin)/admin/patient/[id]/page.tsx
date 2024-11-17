// // "use client";
// // import React, { useEffect, useState } from "react";
// // import Layout from "@/app/Layout";
// // import PatientDetails from "@/app/components/PatientDetails";
// // import { Line } from "react-chartjs-2"; 
// // import { ChartOptions } from "chart.js";
// // import {
// //   Chart as ChartJS,
// //   LineElement,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";


// // // Register the required components (including PointElement and Legend)
// // ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// // interface ProgressData {
// //   ts: number;
// //   values: {
// //     elapsed_time: number;
// //   };
// // }

// // const DataFilter = {
// //   ALL: "all",
// //   HISTORICAL: "historical",
// //   WEEKLY: "weekly",
// //   MONTHLY: "monthly",
// // } as const;

// // type DataFilterType = typeof DataFilter[keyof typeof DataFilter];

// // const dataFilterOptions = [
// //   { value: DataFilter.ALL, label: "All Data (Default)" },
// //   { value: DataFilter.WEEKLY, label: "Last Week" },
// // ];

// // const PatientPage = ({ params }: { params: { id: string } }) => {
// //   const { id } = params;
// //   const [progressData, setProgressData] = useState<ProgressData[]>([]);
// //   const [historicalData, setHistoricalData] = useState<ProgressData[]>([]);
// //   const [dataFilter, setDataFilter] = useState<DataFilterType>(DataFilter.ALL);

// //   // Dummy historical data
// //   useEffect(() => {
// //     const dummyHistoricalData: ProgressData[] = [
// //       { ts: 1731484855119, values: { elapsed_time: 2.83 } },
// //       { ts: 1731484755119, values: { elapsed_time: 2.83 } },
// //       { ts: 1731484655119, values: { elapsed_time: 2.83 } },
// //       { ts: 1731562898389, values: { elapsed_time: 2.51 } },
// //       { ts: 1731563944687, values: { elapsed_time: 3.45 } },
// //       { ts: new Date("2024-11-15T10:00:00Z").getTime(), values: { elapsed_time: 4.5 } }, // 4.5 minutes
// //     ];
// //     setHistoricalData(dummyHistoricalData);
// //   }, []);

// //   // Filter data based on selected filter option (Weekly, Monthly, etc.)
// //   useEffect(() => {
// //     let filteredData = [...historicalData];

// //     if (dataFilter === DataFilter.WEEKLY) {
// //       const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
// //       filteredData = historicalData.filter((entry) => entry.ts >= oneWeekAgo);
// //     } else if (dataFilter === DataFilter.MONTHLY) {
// //       const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
// //       filteredData = historicalData.filter((entry) => entry.ts >= oneMonthAgo);
// //     }

// //     setProgressData(filteredData);
// //   }, [dataFilter, historicalData]);

// //   const chartData = {
// //     labels: progressData.map((entry) =>
// //       new Date(entry.ts).toLocaleDateString("en-US", {
// //         month: "short",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     ),
// //     datasets: [
// //       {
// //         label: "Elapsed Time (minutes)",
// //         data: progressData.map((entry) => entry.values.elapsed_time * 10),
// //         borderColor: progressData.map((entry) => {
// //           const elapsedTime = entry.values.elapsed_time * 10;
// //           if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)"; // Green
// //           if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)"; // Blue
// //           return "rgba(255, 0, 0, 1)"; // Red
// //         }),
// //         backgroundColor: "rgba(0, 0, 0, 0)",
// //         pointBackgroundColor: progressData.map((entry) => {
// //           const elapsedTime = entry.values.elapsed_time * 10;
// //           if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)"; // Green
// //           if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)"; // Blue
// //           return "rgba(255, 0, 0, 1)"; // Red
// //         }),
// //         fill: false,
// //         borderWidth: 2,
// //         tension: 0.3,
// //       },
// //     ],
// //   };

// //   const chartOptions:ChartOptions<"line"> = {
// //     responsive: true,
// //     scales: {
// //       x: {
// //         title: { display: true, text: "Date", font: { size: 16 } },
// //         ticks: {
// //           maxRotation: 45,
// //           minRotation: 45,
// //         },
// //       },
// //       y: {
// //         title: { display: true, text: "Elapsed Time (minutes)", font: { size: 16 } },
// //         beginAtZero: true,
// //       },
// //     },
// //     plugins: {
// //       legend: {
// //         display: true,
// //         position: "bottom",
// //         labels: {
// //           usePointStyle: true,
// //           generateLabels: () => [
// //             { text: "0-30 mins: Good", fillStyle: "rgba(0, 128, 0, 1)" },
// //             { text: "31-40 mins: Better", fillStyle: "rgba(0, 0, 255, 1)" },
// //             { text: "Above 40 mins: Critical", fillStyle: "rgba(255, 0, 0, 1)" },
// //           ],
// //         },
// //       },
// //     },
// //   };

// //   return (
// //     <Layout>
// //       <div className="flex flex-col items-center pb-6">
// //         <div className="w-full mb-8">
// //           <PatientDetails childId={id} />
// //         </div>
// //         <h1 className="text-[2rem] mb-2">Analysis of Engagement Frequency for SawaTok </h1>
// //         <div className="flex justify-center w-full">
// //           <div className="w-full max-w-7xl px-4">
// //             <div className="mb-6 relative">
// //               <select
// //                 value={dataFilter}
// //                 onChange={(e) => setDataFilter(e.target.value as DataFilterType)}
// //                 className="w-56 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
// //               >
// //                 {dataFilterOptions.map((option) => (
// //                   <option key={option.value} value={option.value}>
// //                     {option.label}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div className="h-128 bg-white p-4 rounded-lg shadow">
// //   {/* Line chart rendering */}
// //   <Line data={chartData} options={chartOptions} />
// // </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default PatientPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import Layout from "@/app/Layout";
// import PatientDetails from "@/app/components/PatientDetails";
// import { Line } from "react-chartjs-2";
// import { ChartOptions } from "chart.js";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the required components (including PointElement and Legend)
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// interface ProgressData {
//   ts: number;
//   values: {
//     elapsed_time: number;
//   };
// }

// const DataFilter = {
//   ALL: "all",
//   HISTORICAL: "historical",
//   WEEKLY: "weekly",
//   MONTHLY: "monthly",
// } as const;

// type DataFilterType = typeof DataFilter[keyof typeof DataFilter];

// const dataFilterOptions = [
//   { value: DataFilter.ALL, label: "All Data (Default)" },
//   { value: DataFilter.WEEKLY, label: "Last Week" },
// ];

// const PatientPage = ({ params }: { params: { id: string } }) => {
//   const { id } = params;
//   const [progressData, setProgressData] = useState<ProgressData[]>([]);
//   const [historicalData, setHistoricalData] = useState<ProgressData[]>([]);
//   const [dataFilter, setDataFilter] = useState<DataFilterType>(DataFilter.ALL);

//   // Dummy historical data
//   useEffect(() => {
//     const dummyHistoricalData: ProgressData[] = [
//       { ts: 1731484855119, values: { elapsed_time: 2.83 } },
//       { ts: 1731484755119, values: { elapsed_time: 2.83 } },
//       { ts: 1731484655119, values: { elapsed_time: 2.83 } },
//       { ts: 1731562898389, values: { elapsed_time: 2.51 } },
//       { ts: 1731563944687, values: { elapsed_time: 3.45 } },
//       { ts: new Date("2024-11-15T10:00:00Z").getTime(), values: { elapsed_time: 4.5 } },
//     ];
//     setHistoricalData(dummyHistoricalData);
//   }, []);

//   // Dynamically add data for the current day
//   useEffect(() => {
//     const generateDynamicData = () => {
//       const today = new Date();
//       const todayTimestamp = today.setHours(0, 0, 0, 0); // Start of today

//       // Check if today's data already exists
//       const isTodayDataPresent = historicalData.some((entry) => {
//         const entryDate = new Date(entry.ts).setHours(0, 0, 0, 0);
//         return entryDate === todayTimestamp;
//       });

//       if (!isTodayDataPresent) {
//         // Add today's dummy data
//         const randomElapsedTime = Math.random() * 5; // Simulating random elapsed time (up to 5 mins)
//         const newEntry: ProgressData = {
//           ts: today.getTime(),
//           values: { elapsed_time: randomElapsedTime },
//         };
//         setHistoricalData((prevData) => [...prevData, newEntry]);
//       }
//     };

//     generateDynamicData();
//   }, [historicalData]);

//   // Filter data based on selected filter option (Weekly, Monthly, etc.)
//   useEffect(() => {
//     let filteredData = [...historicalData];

//     if (dataFilter === DataFilter.WEEKLY) {
//       const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
//       filteredData = historicalData.filter((entry) => entry.ts >= oneWeekAgo);
//     } else if (dataFilter === DataFilter.MONTHLY) {
//       const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
//       filteredData = historicalData.filter((entry) => entry.ts >= oneMonthAgo);
//     }

//     setProgressData(filteredData);
//   }, [dataFilter, historicalData]);

//   const chartData = {
//     labels: progressData.map((entry) =>
//       new Date(entry.ts).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     ),
//     datasets: [
//       {
//         label: "Elapsed Time (minutes)",
//         data: progressData.map((entry) => entry.values.elapsed_time * 10),
//         borderColor: progressData.map((entry) => {
//           const elapsedTime = entry.values.elapsed_time * 10;
//           if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)"; // Green
//           if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)"; // Blue
//           return "rgba(255, 0, 0, 1)"; // Red
//         }),
//         backgroundColor: "rgba(0, 0, 0, 0)",
//         pointBackgroundColor: progressData.map((entry) => {
//           const elapsedTime = entry.values.elapsed_time * 10;
//           if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)"; // Green
//           if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)"; // Blue
//           return "rgba(255, 0, 0, 1)"; // Red
//         }),
//         fill: false,
//         borderWidth: 2,
//         tension: 0.3,
//       },
//     ],
//   };

//   const chartOptions: ChartOptions<"line"> = {
//     responsive: true,
//     scales: {
//       x: {
//         title: { display: true, text: "Date", font: { size: 16 } },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//         },
//       },
//       y: {
//         title: { display: true, text: "Elapsed Time (minutes)", font: { size: 16 } },
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//         labels: {
//           usePointStyle: true,
//           generateLabels: () => [
//             { text: "0-30 mins: Good", fillStyle: "rgba(0, 128, 0, 1)" },
//             { text: "31-40 mins: Better", fillStyle: "rgba(0, 0, 255, 1)" },
//             { text: "Above 40 mins: Critical", fillStyle: "rgba(255, 0, 0, 1)" },
//           ],
//         },
//       },
//     },
//   };

//   return (
//     <Layout>
//       <div className="flex flex-col items-center pb-6">
//         <div className="w-full mb-8">
//           <PatientDetails childId={id} />
//         </div>
//         <h1 className="text-[2rem] mb-2">Analysis of Engagement Frequency for SawaTok </h1>
//         <div className="flex justify-center w-full">
//           <div className="w-full max-w-7xl px-4">
//             <div className="mb-6 relative">
//               <select
//                 value={dataFilter}
//                 onChange={(e) => setDataFilter(e.target.value as DataFilterType)}
//                 className="w-56 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
//               >
//                 {dataFilterOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="h-128 bg-white p-4 rounded-lg shadow">
//               {/* Line chart rendering */}
//               <Line data={chartData} options={chartOptions} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PatientPage;


"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/app/Layout";
import PatientDetails from "@/app/components/PatientDetails";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ProgressData {
  ts: number;
  values: {
    elapsed_time: number;
  };
}

const DataFilter = {
  NOVEMBER: "november",
  // LAST_WEEK: "last_week",
  LAST_MONTH: "last_month",
} as const;

type DataFilterType = typeof DataFilter[keyof typeof DataFilter];

const dataFilterOptions = [
  { value: DataFilter.NOVEMBER, label: "November Data" },
  // { value: DataFilter.LAST_WEEK, label: "Last 7 Days" },
  { value: DataFilter.LAST_MONTH, label: "Last Month (October)" },
];

const PatientPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [historicalData, setHistoricalData] = useState<ProgressData[]>([]);
  const [dataFilter, setDataFilter] = useState<DataFilterType>(DataFilter.NOVEMBER);

  // Generate historical data for both October and November
  const generateHistoricalData = () => {
    const data: ProgressData[] = [];
    const today = new Date();
    
    // Generate data for October
    for (let day = 1; day <= 31; day++) {
      const date = new Date(2023, 9, day); // October data
      data.push({
        ts: date.getTime(),
        values: { 
          elapsed_time: 2 + Math.random() * 3 // Random time between 2-5 minutes
        }
      });
    }

    // Generate data for November up to current date
    const currentDate = new Date();
    for (let day = 1; day <= currentDate.getDate(); day++) {
      const date = new Date(2023, 10, day); // November data
      if (date <= currentDate) {
        data.push({
          ts: date.getTime(),
          values: { 
            elapsed_time: 2 + Math.random() * 3
          }
        });
      }
    }

    return data;
  };

  // Initialize historical data
  useEffect(() => {
    setHistoricalData(generateHistoricalData());
  }, []);

  // Auto-update current day's data
  useEffect(() => {
    const updateTodayData = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      setHistoricalData(prevData => {
        // Remove any existing data for today
        const filteredData = prevData.filter(entry => {
          const entryDate = new Date(entry.ts);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() !== today.getTime();
        });
        
        // Add new data for today
        return [...filteredData, {
          ts: new Date().getTime(),
          values: { 
            elapsed_time: 2 + Math.random() * 3
          }
        }];
      });
    };

    // Update immediately and then every hour
    updateTodayData();
    const interval = setInterval(updateTodayData, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  // Filter data based on selected filter option
  useEffect(() => {
    let filteredData = [...historicalData];
    const now = new Date();

    if (dataFilter === DataFilter.NOVEMBER) {
      // Filter for November data
      filteredData = historicalData.filter(entry => {
        const entryDate = new Date(entry.ts);
        return entryDate.getMonth() === 10 && entryDate.getFullYear() === 2023; // 10 is November (0-based)
      });
    } else if (dataFilter === DataFilter.LAST_MONTH) {
      // Filter for October data
      filteredData = historicalData.filter(entry => {
        const entryDate = new Date(entry.ts);
        return entryDate.getMonth() === 9 && entryDate.getFullYear() === 2023; // 9 is October (0-based)
      });
    }

    // Sort by date
    filteredData.sort((a, b) => a.ts - b.ts);
    setProgressData(filteredData);
  }, [dataFilter, historicalData]);

  const chartData = {
    labels: progressData.map((entry) =>
      new Date(entry.ts).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Elapsed Time (minutes)",
        data: progressData.map((entry) => entry.values.elapsed_time * 10),
        borderColor: progressData.map((entry) => {
          const elapsedTime = entry.values.elapsed_time * 10;
          if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)";
          if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)";
          return "rgba(255, 0, 0, 1)";
        }),
        backgroundColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: progressData.map((entry) => {
          const elapsedTime = entry.values.elapsed_time * 10;
          if (elapsedTime <= 30) return "rgba(0, 128, 0, 1)";
          if (elapsedTime <= 40) return "rgba(0, 0, 255, 1)";
          return "rgba(255, 0, 0, 1)";
        }),
        fill: false,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: "Date", font: { size: 16 } },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: { display: true, text: "Elapsed Time (minutes)", font: { size: 16 } },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          generateLabels: () => [
            { text: "0-30 mins: Good", fillStyle: "rgba(0, 128, 0, 1)" },
            { text: "31-40 mins: Better", fillStyle: "rgba(0, 0, 255, 1)" },
            { text: "Above 40 mins: Critical", fillStyle: "rgba(255, 0, 0, 1)" },
          ],
        },
      },
    },
  };

  return (
    <Layout>
      <div className="flex flex-col items-center pb-6">
        <div className="w-full mb-8">
          <PatientDetails childId={id} />
        </div>
        <h1 className="text-2xl mb-2">Analysis of Engagement Frequency for SawaTok</h1>
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl px-4">
            <div className="mb-6 relative">
              <select
                value={dataFilter}
                onChange={(e) => setDataFilter(e.target.value as DataFilterType)}
                className="w-56 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                {dataFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-128 bg-white p-4 rounded-lg shadow">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientPage;