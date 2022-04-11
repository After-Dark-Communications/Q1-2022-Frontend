import React, { useEffect, useState } from "react";
import { PieChart } from "../components/Charts/Pie";
import { Box } from "../components/common/Box";
import { Table } from "../components/common/Table";
import { NavBar } from "../components/containers/Nav";
import { Survey } from "../components/containers/Survey";
import { SurveyAppSemble } from "../components/containers/SurveyAppsemble";

// import { surveys } from "../constants";
import { theme } from "../styles/theme";
const axios = require("axios").default;

const Header = (): JSX.Element => {
  let counter = 0;
  const headers = [
    "ID",
    "Positive Experience",
    "Dinner Rating",
    "Food Rating",
    "Rating Feedback",
  ];

  return (
    <>
      {headers.map((header, index) => {
        return <th key={index}>{header}</th>;
      })}
    </>
  );
};
const SurveysAPI = () => {
  const [surveys, setSurveys] = useState<[]>();

  const dataPie = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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

  useEffect(() => {
    axios
      .get("https://appsemble.app/api/apps/232/resources/answer")
      .then((resp: any) => {
        console.log(resp.data);
        setSurveys(resp.data);
      });

    surveys?.map((survey) => console.log(survey));
  }, []);

  return (
    <Box row>
      <NavBar />
      <Box column>
        <Box css={{ padding: "4em" }}>
          <h1>Surveys</h1>

          <Table id="surveys">
            <tbody>
              <tr>
                <Header />
              </tr>

              {surveys?.map((survey: any) => {
                return (
                  <SurveyAppSemble
                    key={survey.id}
                    id={survey.id}
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
        <Box row spaceBetween css={{ width: "500px" }}>
          <PieChart data={dataPie} />
          <PieChart data={dataPie} />
        </Box>
      </Box>
    </Box>
  );
};

export default SurveysAPI;
