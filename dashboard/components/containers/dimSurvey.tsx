import Link from "next/link";
import React from "react";
import { Settings } from "../../public/SVG/Settings";
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
  return (
    <TableRow key={_id}>
      <Link href={`/survey/${_id}`} passHref>
        <td style={{ cursor: "pointer" }}>{name}</td>
      </Link>

      <td>{description}</td>
      <td>{questions[0].question}</td>
      <td>{createdAt}</td>
      <td>{visibility}</td>
      <Link href={`/surveys/${_id}`} passHref>
        <td style={{ cursor: "pointer" }}>
          <Settings width={"22"} />
        </td>
      </Link>
    </TableRow>
  );
};
