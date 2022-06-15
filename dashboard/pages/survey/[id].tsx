import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "../../components/common/Box";
import { SurveyAPIProps } from "../../components/containers/dimSurvey";
import { theme } from "../../styles/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dim from "../../public/icons/dim-logo.png";
import Image from "next/image";
// ../public/icons/dim-logo.png

type SurveyByIDProps = {
  survey: SurveyAPIProps;
};

const UserSurvey: React.FC<SurveyByIDProps> = ({ survey }) => {
  console.log(survey);

  const { register, setValue, control, handleSubmit } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdate = async (data: any) => {
    let responseArray: string[] = [];
    const inputType = {
      surveyTaker: "John Doe",
      answers: [
        {
          answer: "I rate it 10 out of 10",
          question: {
            question: "How would you rate your experience?",
            type: "text",
            options: [],
            required: true,
          },
        },
      ],
    };

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        console.log(data[key]);
        // console.log(key);
        responseArray.push(data[key]);
      }
    }

    console.log(responseArray);
    const input = {
      surveyTaker: "Mihail",
      answers: inputType,
    };
    console.log(input);

    await axios
      .post(
        `https://q1-survey-service.herokuapp.com/api/responses/${survey._id}
    `,
        inputType
      )
      .then((data) => console.log(data));
  };

  return (
    <Box
      column
      style={{
        height: "100vh",
        margin: "5em 20em",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit(async (data: any) => {
            await handleUpdate(data);
            setIsSubmitted(true);
          })}
        >
          {survey.questions.map((question, i) => {
            return (
              <Box key={question.title + question.question + i}>
                <h2>{question.question}</h2>
                {question.type == "text" ? (
                  <input
                    {...register(`${i}`, { required: question.required })}
                    style={{
                      backgroundColor: `${theme.colors.gray400}`,
                      font: "inherit",
                      color: `${theme.colors.gray800}`,
                      fontSize: "16px",
                      height: "50px",
                      width: "100%",
                      border: `1px solid ${theme.colors.gray600}`,
                      borderRadius: "6px",
                      padding: "10px",
                      marginBottom: "20px",
                    }}
                  ></input>
                ) : (
                  <select
                    {...register(`${i}`, { required: question.required })}
                    style={{
                      backgroundColor: `${theme.colors.gray400}`,
                      font: "inherit",
                      color: `${theme.colors.gray800}`,
                      fontSize: "14px",
                      height: "50px",
                      width: "100%",
                      border: `1px solid ${theme.colors.gray600}`,
                      borderRadius: "6px",
                    }}
                  >
                    <option value="1">1 </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                )}
              </Box>
            );
          })}
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <input
              type="submit"
              value="Submit"
              style={{
                width: "20%",
                height: "40px",
                background: `${theme.colors.voilet100}`,
                border: `1px solid ${theme.colors.voilet100}`,
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "16px",
                marginTop: "50px",
              }}
            ></input>
          </Box>
        </form>
      ) : (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <h1>Thank you for submitting the survey !</h1>
        </Box>
      )}
    </Box>
  );
};

export default UserSurvey;

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
