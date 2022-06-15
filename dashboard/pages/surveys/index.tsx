// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Line } from "../../components/Charts/Line";
import { PieChart } from "../../components/Charts/Pie";
import { Box } from "../../components/common/Box";
import { Table } from "../../components/common/Table";
import {
  SurveyAPI,
  SurveyAPIProps,
} from "../../components/containers/dimSurvey";
import { NavBar } from "../../components/containers/Nav";
import {
  SurveyAppSemble,
  SurveyProps,
} from "../../components/containers/SurveyAppsemble";

const axios = require("axios").default;

const SurveysDIM = () => {
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
      .get("https://q1-survey-service.herokuapp.com/api/surveys")
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
        <Box css={{ padding: "2em" }}>
          <a onClick={() => setDisplayChart(true)}>
            <h1 style={{ cursor: "pointer" }}>Surveys</h1>
          </a>

          <Table id="surveys" css={{ width: "80vw" }}>
            <tbody>
              <tr>
                <Header />
              </tr>

              {surveys
                ?.sort((a: SurveyAPIProps, b: SurveyAPIProps) =>
                  a.createdAt < b.createdAt ? 1 : 1
                )
                .map((survey: SurveyAPIProps) => {
                  return (
                    <SurveyAPI
                      key={survey._id}
                      _id={survey._id}
                      name={survey.name}
                      description={survey.description}
                      questions={survey.questions}
                      createdAt={new Date(survey.created).toUTCString()}
                      visibility={survey.visibility}
                    />
                  );
                })}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default SurveysDIM;
