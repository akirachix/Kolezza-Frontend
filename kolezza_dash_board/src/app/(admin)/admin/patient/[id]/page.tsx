"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
} from "recharts";
import PatientDetails from "@/app/components/PatientDetails"; // Make sure you have this component imported

const DataFilter = {
  ALL: "all",
  WEEKLY: "weekly",
} as const;

type DataFilterType = typeof DataFilter[keyof typeof DataFilter];

const dataFilterOptions = [
  { value: DataFilter.ALL, label: "All Data (Default)" },
  { value: DataFilter.WEEKLY, label: "Last Week" },
];

const PatientPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, setData] = useState<any[]>([]);
  const [dataFilter, setDataFilter] = useState<DataFilterType>(DataFilter.ALL);

  useEffect(() => {
    const startDate = new Date("2024-11-9");
    const baseData = Array.from({ length: 10 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;
      return { name: dateString, value: Math.floor(Math.random() * 40) + 20 };
    });

    setData(baseData);
  }, []);

  useEffect(() => {
    if (dataFilter === DataFilter.WEEKLY) {
      setData((prev) => prev.slice(-7));
    }
  }, [dataFilter]);

  const CustomizedLine = ({ points }: any) => {
    return (
      <g>
        {points.map((point: any, index: number) => {
          if (index === points.length - 1) return null;

          const nextPoint = points[index + 1];
          const value = point.payload.value;
          const color = value <= 30 ? "#4CAF50" : value <= 40 ? "#2196F3" : "#F44336";

          return (
            <line
              key={index}
              x1={point.x}
              y1={point.y}
              x2={nextPoint.x}
              y2={nextPoint.y}
              stroke={color}
              strokeWidth={2}
            />
          );
        })}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let color = value <= 30 ? "#4CAF50" : value <= 40 ? "#2196F3" : "#F44336";
      let status = value <= 30 ? "Good" : value <= 40 ? "Better" : "Critical";

      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="text-sm">{label}</p>
          <p className="text-sm font-semibold" style={{ color }}>
            {value} minutes ({status})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="flex flex-col pb-6 px-4">
        {/* Patient Details Section */}
        <div className="w-full mb-8">
          <PatientDetails childId={id} />
        </div>

        {/* Name, Age, and Current Therapy Section */}
      

        {/* Engagement Frequency Analysis */}
        <div className="w-full border rounded-lg shadow p-4 bg-white">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Module Engagement Rate</h2>
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
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{ value: "Date", position: "bottom", offset: 0 }}
                />
                <YAxis
                  label={{
                    value: "Elapsed Time (minutes)",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                  }}
                  domain={[0, 60]}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceArea y1={0} y2={30} fill="#4CAF50" fillOpacity={0.1} />
                <ReferenceArea y1={30} y2={40} fill="#2196F3" fillOpacity={0.1} />
                <ReferenceArea y1={40} y2={60} fill="#F44336" fillOpacity={0.1} />
                <Line
                  dataKey="value"
                  stroke="#000"
                  shape={<CustomizedLine />}
                  dot={(props) => {
                    const { cx, cy, value } = props;
                    const color =
                      value <= 30
                        ? "#4CAF50"
                        : value <= 40
                        ? "#2196F3"
                        : "#F44336";
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span className="text-sm">Good (0-30 min)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span className="text-sm">Better (31-40 min)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span className="text-sm">Critical (41-60 min)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientPage;

