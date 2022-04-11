import React, { useEffect, useState } from "react";
import { Box } from "../components/common/Box";
import { Table } from "../components/common/Table";
import { NavBar } from "../components/containers/Nav";
import { Survey } from "../components/containers/Survey";
import { surveys } from "../constants";
import { theme } from "../styles/theme";
const axios = require("axios").default;

const Header = (): JSX.Element => {
  let counter = 0;
  const headers = [
    "ID",
    "Title",
    "Dinner Rating",
    "Food Rating",
    "Rating Feedback",
  ];

  return (
    <>
      {headers.map((header, index) => {
        return (
          <th style={{ color: `${theme.colors.voilet100}` }} key={index}>
            {header}
          </th>
        );
      })}
    </>
  );
};
const Surveys = () => {
  return (
    <Box row>
      <NavBar />
      <Box css={{ margin: "2em" }}>
        <h1>Surveys</h1>

        <Table id="surveys" css={{ marginTop: "50px" }}>
          <tbody>
            <tr>
              <Header />
            </tr>

            {surveys?.map((survey: any, index) => {
              return (
                <Survey
                  key={index}
                  id={survey.id}
                  title={survey.title}
                  answer1={survey.answer1}
                  answer2={survey.answer2}
                  answer3={survey.answer3}
                />
              );
            })}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Surveys;
