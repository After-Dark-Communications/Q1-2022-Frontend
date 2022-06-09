import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Dinner in Motion",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Waiter Service ",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dinner Rating ",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "Food Rating ",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgb(0, 166, 11)",
    },
  ],
};

export function Line() {
  return <Bar options={options} data={data} />;
}
