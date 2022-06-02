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
import { ToastContainer, toast } from "react-toastify";

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
      url: "https://dinner-in-motion-project.ew.r.appspot.com/surveys/",
      data: survey,
    }).then((data) => {
      console.log(data.data);
      toast("Created successfully!", {
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
              width: "1200px",
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
                minWidth: "450px",
                gap: "20px",
                borderRight: "1px solid gray ",
                paddingRight: "100px",
              }}
            >
              <label>Survey Title</label>
              <input
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  minWidth: "350px",
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "14px",
                  height: "50px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
                {...register("surveyTitle", {
                  required: "Question needs a title",
                })}
                placeholder="Survey title"
              />
              <label>Survey description</label>
              <input
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "14px",
                  height: "50px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  borderRadius: "6px",
                  minWidth: "350px",
                }}
                {...register("surveyDescription", {
                  required: "Question needs a title",
                })}
                placeholder="Survey description"
              />
              <button
                style={{
                  marginTop: "30px",
                  width: "100%",
                  height: "50px",
                  background: `${theme.colors.voilet100}`,
                  border: `1px solid ${theme.colors.voilet100}`,
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handlePostSurvey();
                }}
              >
                Submit Survey
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
                minWidth: "350px",
                gap: "20px",
              }}
            >
              <label style={{ color: theme.colors.gray900 }}>
                Question Data
              </label>
              <input
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
                {...register("questionTitle", {
                  required: "Question needs a title",
                })}
                placeholder="Question Title"
              />

              <select
                {...register("category")}
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
                <option value="text">Text Input </option>
                <option value="number">Number</option>
              </select>
              {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
              {/* <p>{data}</p> */}
              <input
                style={{
                  marginTop: "30px",
                  width: "100%",
                  height: "50px",
                  background: `${theme.colors.voilet100}`,
                  border: `1px solid ${theme.colors.voilet100}`,
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "8px",
                  fontSize: "15",
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
                      <Text>{survey.questionTitle}</Text>

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
            <ToastContainer />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateSurvey;
