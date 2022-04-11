import React from "react";
import { Box } from "../common/Box";
import { ListItem } from "../common/ListItem";
import { TableRow } from "../common/Table";
import { Text } from "../common/Text";

export type SurveyProps = {
  id: string;
  title: string;
  answer1: string;
  answer2: string;
  answer3: string;
};

export const Survey: React.FC<SurveyProps> = ({
  id,
  title,
  answer1,
  answer2,
  answer3,
}) => {
  return (
    <>
      <TableRow key={id}>
        <td>#{id}</td>
        <td>{title}</td>
        <td>{answer1}</td>
        <td>{answer2}</td>
        <td>{answer3}</td>
      </TableRow>
    </>
  );
};
