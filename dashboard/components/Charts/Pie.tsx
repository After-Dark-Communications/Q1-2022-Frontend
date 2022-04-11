import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieType = {
  data: ChartData<"pie", number[], unknown>;
};

export const PieChart: React.FC<PieType> = ({ data }) => {
  return <Pie data={data} />;
};
