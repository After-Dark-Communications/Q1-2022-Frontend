// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Line } from "../components/Charts/Line";
import { LineChart } from "../components/Charts/LinearChart";
import { PieChart } from "../components/Charts/Pie";
import { Box } from "../components/common/Box";
import { NavBar } from "../components/containers/Nav";

const axios = require("axios").default;

const Analytics = () => {
  const [surveys, setSurveys] = useState<[]>();
  const [displayChart, setDisplayChart] = useState(false);
  const [headerPie, setHeader] = useState("");
  const [pieChartData, setPieChartData] = useState([]);
  const [newChartData, setNewChartData] = useState<
    {
      instances: any;
      instance: any;
    }[]
  >([]);

  const headers = [
    "Name",
    "Description",
    "Question",
    "Created at",
    "Visibility",
  ];

  useEffect(() => {
    axios
      .get("http://q1-survey-service.herokuapp.com/api/surveys")
      .then((resp: any) => {
        setSurveys(resp.data);
      });
  }, []);

  const camelCaseHeader = (header: string) => {
    switch (header) {
      case "Positive Experience":
        return "positiveExperience";
      case "Dinner Rating":
        return "dinnerRating";
      case "Food Rating":
        return "foodRating";
      case "Waiter Service":
        return "waiterService";
      case "Considering DIM":
        return "consideringDIM";
      default:
        return "";
    }
  };

  const handlePieClick = (header: string) => {
    setPieChartData([]);
    const camelHeader = camelCaseHeader(header);
    setHeader(header);
    surveys!.forEach((survey) => {
      setPieChartData((prevData) => [...prevData, survey[camelHeader]]);
    });

    handleDataCorrectlly();
  };

  const handleDataCorrectlly = () => {
    const newArray = Array.from(new Set(pieChartData));
    setNewChartData([]);

    newArray.map((instance, index) => {
      const instances = pieChartData.filter((i) => i === instance).length;
      //@ts-ignore
      setNewChartData((prevData) => [...prevData, { instances, instance }]);
    });

    setDisplayChart(true);
  };

  const Header = (): JSX.Element => {
    return (
      <>
        {headers.map((header, index) => {
          return (
            <th key={index} style={{ cursor: "pointer" }}>
              {header}
            </th>
          );
        })}
      </>
    );
  };

  return (
    <Box row>
      <NavBar />
      <Box column>
        <Box
          column
          center
          css={{ width: "650px", gap: "50px", margin: "50px 100px" }}
        >
          <Line />
          <LineChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
