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

type SurveyByIDProps = {
  survey: SurveyAPIProps;
};

const SurveyPage: React.FC<SurveyByIDProps> = ({ survey }) => {
  console.log(survey);

  const { register, setValue, control, handleSubmit } = useForm();
  useEffect(() => {
    setValue("updateSurveyName", survey.name);
    setValue("updateSurveyDescription", survey.description);
  }, [setValue, survey.description, survey.name]);

  const handleUpdate = async (input: {}) => {
    await axios
      .patch(
        `https://q1-survey-service.herokuapp.com/api/surveys/${survey._id}
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
              <h3 style={{ color: `${theme.colors.gray900}` }}> Name</h3>

              <input
                {...register("updateSurveyName")}
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "16px",
                  height: "50px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  borderRadius: "6px",
                }}
              ></input>
            </Box>
            <Box css={{ marginBottom: "50px" }}>
              <h3 style={{ color: `${theme.colors.gray900}` }}> Description</h3>
              <textarea
                {...register("updateSurveyDescription")}
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "16px",
                  height: "50px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  paddingTop: "13px",
                  borderRadius: "6px",
                }}
              ></textarea>
            </Box>

            <ToastContainer />

            <input
              type="submit"
              value="Update"
              style={{
                width: "100%",
                height: "50px",
                background: `${theme.colors.voilet100}`,
                border: `1px solid ${theme.colors.voilet100}`,
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            ></input>
          </Box>
        </form>
        <Box css={{ padding: "3em 5em" }}>
          <CollapsibleDemo content={survey.questions} />
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

export const getStaticProps = async (context: { params: { id: any } }) => {
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
