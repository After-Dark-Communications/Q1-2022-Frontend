import axios from "axios";
import { Box } from "../../components/common/Box";
import { surveyItemCSS } from "../../components/common/Text";
import {
  Question,
  SurveyAPIProps,
} from "../../components/containers/dimSurvey";
import { NavBar } from "../../components/containers/Nav";

type SurveyByIDProps = {
  survey: SurveyAPIProps;
};

const SurveyPage: React.FC<SurveyByIDProps> = ({ survey }) => {
  console.log(survey);
  return (
    <Box row>
      <NavBar />
      <Box row>
        <Box css={{ padding: "2em" }}>
          <h1>{survey.name}</h1>
          <h2>{survey.description}</h2>
          {survey.questions.map((question: Question, i) => {
            return (
              <Box key={i}>
                {" "}
                <p>{question.question}</p>{" "}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SurveyPage;

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://q1-survey-service.herokuapp.com/api/surveys/"
  );
  const data = await res.json();

  const paths = data.map((survey: SurveyAPIProps) => {
    return {
      params: {
        id: survey._id.toString(),
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: any; }; }) => {
  const id = context.params.id;

  const response = await fetch(
    "https://q1-survey-service.herokuapp.com/api/surveys/" + id
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      survey: data,
    },
  };
};
