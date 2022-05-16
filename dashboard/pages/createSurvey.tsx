// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/containers/Nav";
import styles from "../styles/Home.module.css";
import { Box } from "../components/common/Box";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Text } from "../components/common/Text";
import { theme } from "../styles/theme";

const CreateSurvey: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const [displaySurveys, setDisplaySurveys] = useState(false);
  const [surveys, setSurveys] = useState<[]>([]);
  const [surveyQuestions, setQuestions] = useState<[]>([]);
  const axios = require("axios").default;

  type Survey = {
    name: string;
    description: string;
    visibility: "public" | "private";
    questions: [
      {
        question: string;
        type: "text" | "number";
        options: [];
        required: boolean;
      }
    ];
  };

  // const survey: Survey = {
  //   name: "Dinner",
  //   description: "No description",
  //   visibility: "private",
  //   questions: [
  //     {
  //       question: "How would you rate it fam?",
  //       type: "text",
  //       options: [],
  //       required: false,
  //     },
  //   ],
  // };

  const handlePostSurvey = () => {
    const filteredQuestions = [];
    surveyQuestions.forEach((question) => {
      const filteredQ = {
        question: question.questionTitle,
        type: question.category,
        options: [],
        required: false,
      };
      filteredQuestions.push(filteredQ);
    });
    console.log(filteredQuestions);

    const survey = {
      name: surveyQuestions[0].surveyTitle,
      description: surveyQuestions[0].surveyDescription,
      visibility: "public",
      questions: filteredQuestions,
    };
    console.log(survey);
    axios({
      method: "post",
      url: "http://q1-survey-service.herokuapp.com/api/surveys/",
      data: survey,
    }).then((data) => {
      console.log(data.data);
      alert("Survey created succesfully");
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box row>
        <NavBar />
        <Box column>
          <Box
            row
            css={{
              padding: "5em",
              width: "900px",
              gap: "100px",
            }}
          >
            {errors && errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                gap: "20px",
              }}
            >
              <label>Survey Title</label>
              <input
                style={{
                  minWidth: "300px",
                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  color: "white",
                  backgroundColor: "transparent",
                  marginBottom: "20px",
                }}
                {...register("surveyTitle", {
                  required: "Question needs a title",
                })}
                placeholder="Question Title"
              />
              <label>Survey description</label>
              <input
                style={{
                  minWidth: "300px",
                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  color: "white",
                  backgroundColor: "transparent",
                }}
                {...register("surveyDescription", {
                  required: "Question needs a title",
                })}
                placeholder="Question Title"
              />
              <button
                style={{
                  width: "300px",
                  marginTop: "20px",
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px",
                  border: "1px solid white",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handlePostSurvey();
                }}
              >
                Submit survey to the API
              </button>
            </form>
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
                setData(JSON.stringify(data));
                setQuestions((surv) => [...surv, data]);
                console.log(surveyQuestions);
              })}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                gap: "20px",
              }}
            >
              <label style={{ color: theme.colors.voilet100 }}>
                Question Data
              </label>
              <input
                style={{
                  minWidth: "300px",

                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  color: "white",
                  backgroundColor: "transparent",
                }}
                {...register("questionTitle", {
                  required: "Question needs a title",
                })}
                placeholder="Question Title"
              />

              <select
                {...register("category")}
                style={{
                  minWidth: "100px",
                  marginTop: "20px",
                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                <option value="text">Text Input </option>
                <option value="number">Number</option>
              </select>
              {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
              {/* <p>{data}</p> */}
              <input
                style={{
                  minWidth: "100px",
                  marginTop: "20px",
                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  color: "white",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                type="submit"
                value="Add Question"
              />
            </form>

            <form>
              <label>Questions</label>
              {surveyQuestions &&
                surveyQuestions.map((survey, i) => {
                  return (
                    <div
                      key={survey.questionTitle + "i" + i + survey.category}
                      style={{
                        padding: "10px",
                        border: "1px solid gray",
                        borderRadius: "4px",
                        marginTop: "20px",
                        width: "360px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>{i + ". " + survey.questionTitle}</Text>

                      {survey.category == "text" ? (
                        <input
                          style={{
                            width: "300px",
                            height: "40px",
                            borderRadius: "6px",
                            border: "1px solid white",
                            color: "white",
                            backgroundColor: "transparent",
                          }}
                        ></input>
                      ) : (
                        <select
                          key={
                            surveyQuestions.title +
                            "i" +
                            i +
                            surveyQuestions.category
                          }
                          style={{
                            width: "100px",
                            height: "40px",
                            borderRadius: "6px",
                            border: "1px solid white",
                            color: "white",
                            backgroundColor: "transparent",
                          }}
                        >
                          <option value="1">1 </option>
                          <option value="2">2</option>
                          <option value="3">3 </option>
                          <option value="5">4 </option>
                          <option value="5">5 </option>
                        </select>
                      )}
                    </div>
                  );
                })}
              {/* <input type="submit"></input> */}
            </form>

            {/* <button
            style={{
              width: "300px",
              marginTop: "150px",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              border: "1px solid white",
            }}
            onClick={() =>
              localStorage.setItem("surveys", JSON.stringify(surveys))
            }
          >
            Submit survey to LocalStorage
          </button> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateSurvey;
