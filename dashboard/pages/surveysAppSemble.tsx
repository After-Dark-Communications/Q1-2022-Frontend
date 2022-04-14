import React, { useEffect, useState } from "react";
import { PieChart } from "../components/Charts/Pie";
import { Box } from "../components/common/Box";
import { Table } from "../components/common/Table";
import { NavBar } from "../components/containers/Nav";
import {
  SurveyAppSemble,
  SurveyProps,
} from "../components/containers/SurveyAppsemble";

// import { surveys } from "../constants";
import { theme } from "../styles/theme";
const axios = require("axios").default;

const SurveysAPI = () => {
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
    "ID",
    "Positive Experience",
    "Dinner Rating",
    "Food Rating",
    "Waiter Service",
    "Considering DIM",
  ];

  useEffect(() => {
    axios
      .get("https://appsemble.app/api/apps/232/resources/answer")
      .then((resp: any) => {
        setSurveys(resp.data);
      });

    surveys?.map((survey) => console.log(survey));
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
            <th
              onClick={() => handlePieClick(header)}
              key={index}
              style={{ cursor: "pointer" }}
            >
              {header}
            </th>
          );
        })}
      </>
    );
  };

  const dataPie = {
    labels: newChartData.map((i) => i.instance),
    datasets: [
      {
        label: "# of Votes",
        data: newChartData.map((i) => i.instances),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box row>
      <NavBar />
      <Box row>
        <Box css={{ padding: "2em" }}>
          <a onClick={() => setDisplayChart(true)}>
            <h1 style={{ cursor: "pointer" }}>Surveys</h1>
          </a>

          <Table id="surveys">
            <tbody>
              <tr>
                <Header />
              </tr>

              {surveys
                ?.sort((a: SurveyProps, b: SurveyProps) =>
                  a.id > b.id ? 1 : -1
                )
                .map((survey: SurveyProps) => {
                  return (
                    <SurveyAppSemble
                      key={survey.id}
                      id={survey.id}
                      consideringDIM={survey.consideringDIM}
                      positiveExperience={survey.positiveExperience}
                      dinnerRating={survey.dinnerRating}
                      foodRating={survey.foodRating}
                      waiterService={survey.waiterService}
                    />
                  );
                })}
            </tbody>
          </Table>
        </Box>
        {displayChart && (
          <Box row center css={{ width: "550px", margin: "150px 100px" }}>
            <PieChart data={dataPie} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SurveysAPI;
