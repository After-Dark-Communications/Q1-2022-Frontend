import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "../../components/common/Box";
import CollapsibleDemo, {
  Collapsible,
} from "../../components/common/Collapsable";
import {
  Question,
  SurveyAPIProps,
} from "../../components/containers/dimSurvey";
import { NavBar } from "../../components/containers/Nav";
import { theme } from "../../styles/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SurveyProps } from "../../components/containers/Survey";

type SurveyByIDProps = {
  response: SurveyAPIProps;
};

const Responses: React.FC<SurveyByIDProps> = ({ response }) => {
  console.log(response);

  const { register, setValue, control, handleSubmit } = useForm();
  // useEffect(() => {
  //   setValue("updateSurveyName", response.name);
  //   setValue("updateSurveyDescription", response.description);
  // }, [setValue, response.description, response.name]);

  const handleUpdate = async (input: {}) => {
    await axios
      .patch(
        `https://q1-survey-service.herokuapp.com/api/surveys/${response._id}
    `,
        input
      )
      .then((data) => {
        console.log(data);
        toast("Updated successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Box row>
      <NavBar />
      <Box row>
        <form
          onSubmit={handleSubmit((data) => {
            const inputVariable = {
              name: data.updateSurveyName,
              description: data.updateSurveyDescription,
            };
            console.log(inputVariable);
            handleUpdate(inputVariable);
          })}
        >
          <Box css={{ padding: "3em 5em", width: "700px" }}>
            <Box css={{ marginBottom: "50px" }}>
              <h2
                style={{
                  color: `${theme.colors.voilet100}`,
                  marginBottom: "40px",
                }}
              >
                {" "}
                {response.name}
              </h2>
              {response.responses.map((resp) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Box
                    key={resp._id + resp.surveyTaker}
                    css={{ borderBottom: "1px solid gray" }}
                  >
                    {resp.answers.map((answ: any) => {
                      return (
                        <Box key={answ.id}>
                          <h3 style={{ color: `${theme.colors.gray800}` }}>
                            - {answ.question.question}
                          </h3>
                          <h4 style={{ color: `${theme.colors.gray900}` }}>
                            {answ.answer}
                          </h4>
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>

            <ToastContainer />
          </Box>
        </form>
        {/* <Box css={{ padding: "3em 5em" }}>
          <CollapsibleDemo content={response.questions} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Responses;

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

export const getStaticProps = async (context: { params: { id: any } }) => {
  const id = context.params.id;

  const response = await fetch(
    "https://q1-survey-service.herokuapp.com/api/surveys/" + id + "/responses"
  );
  const data = await response.json();
  console.log(data);
  return {
    props: {
      response: data,
    },
  };
};
