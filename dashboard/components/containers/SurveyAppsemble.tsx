import React from "react";
import { Box } from "../common/Box";
import { ListItem } from "../common/ListItem";
import { TableRow } from "../common/Table";
import { surveyItemCSS, Text } from "../common/Text";

export type SurveyProps = {
  id: number;
  positiveExperience?: boolean;
  dinnerRating?: number;
  foodRating?: number;
  waiterService?: number;
  consideringDIM?: number;
  ratingFeedback?: string;
  notTriedReason?: string;
  graphicalEditorRating?: number;
  graphicalEditorExplanation?: number;
  commonGroundRating?: number;
  commonGroundExplanation?: string;
  videoTutorialsRating?: number;
  videoTutorialsExplanation?: string;
  whyNot?: string;
  anythingElse?: string;
};

export const SurveyAppSemble: React.FC<SurveyProps> = (survey) => {
  const condiserDIM = (response: number) => {
    switch (response) {
      case 1:
        return "Definitely not";
      case 2:
        return "Probably not";
      case 3:
        return "Possibly";
      case 4:
        return "Probably ";
      case 5:
        return "Definitely";
      default:
        return "No";
    }
  };
  return (
    <>
      <TableRow key={survey.id}>
        <td>#{survey.id}</td>
        <td>{survey.positiveExperience ? "True" : "False"}</td>
        <td>{survey.dinnerRating}</td>
        <td>{survey.foodRating}</td>
        <td>{survey.waiterService}</td>
        <td>{condiserDIM(survey.consideringDIM)}</td>
      </TableRow>
    </>
  );
};
