import Link from "next/link";
import React from "react";
import { Box } from "../common/Box";
import { ListItem } from "../common/ListItem";
import { TableRow } from "../common/Table";
import { Text } from "../common/Text";

export type Question = {
  title: string;
  question: string;
  type: string;
  required: boolean;
};

export type SurveyAPIProps = {
  _id: string;
  name: string;
  questions: Question[];
  description: string;
  responses: [{}];
  createdAt: string;
  visibility: string;
};

export const SurveyAPI: React.FC<SurveyAPIProps> = ({
  _id,
  name,
  questions,
  description,
  responses,
  createdAt,
  visibility,
}) => {
  console.log(_id);
  return (
    <Link href={`/surveys/${_id}`} passHref>
      <TableRow key={_id} css={{ cursor: "pointer" }}>
        <td>{name}</td>
        <td>{description}</td>
        <td>{questions[0].question}</td>
        <td>{createdAt}</td>
        <td>{visibility}</td>
      </TableRow>
    </Link>
  );
};
