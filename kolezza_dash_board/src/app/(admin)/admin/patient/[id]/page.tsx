"use client";
import React, { useEffect, useState } from "react";
import useGetChildData from "@/app/hooks/useGetChildData";
import Layout from "@/app/Layout";
import PatientDetails from "@/app/components/PatientDetails";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);
const WS_SERVER_URL = "ws://192.168.100.240:8765";
interface ProgressData {
  expected_text: string;
  recognized_text: string;
  correct: boolean;
  stars_earned: number;
  elapsed_time: number;
}
const PatientPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const { loading: childLoading, error: childError } = useGetChildData(id);
  useEffect(() => {
    // Only connect to WebSocket for user ID "2"
    if (id === "2") {
      const ws = new WebSocket(WS_SERVER_URL);
      ws.onopen = () => {
        console.log("WebSocket connected");
      };
      ws.onmessage = (event) => {
        const data: ProgressData = JSON.parse(event.data);
        console.log("Received data from WebSocket:", data);
        setProgressData((prevData) => [...prevData, data]);
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
      return () => {
        ws.close();
      };
    }
  }, [id]);
  if (childLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (childError) {
    return (
      <div className="text-center text-red-500">
        Error loading patient details: {childError}
      </div>
    );
  }
  const data = {
    labels: progressData.map((_, index) => `Word ${index + 1}`),
    datasets: [
      {
        label: "Elapsed Time (s)",
        data: progressData.map((d) => d.elapsed_time),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Word Number",
        },
      },
      y: {
        title: {
          display: true,
          text: "Elapsed Time (s)",
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <Layout>
      <div className="flex flex-col items-center h-full py-4">
        <div className="w-full mb-8">
          <PatientDetails childId={id} />
        </div>
        <div className="flex justify-center w-full">
          {id === "2" ? (
            <div className="w-[90%] md:w-[70%] lg:w-[60%] h-[400px]">
              <Line data={data} options={options} />
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Only user ID 2 has WebSocket enabled for testing.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default PatientPage;