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
import CollapsibleDemo from "../components/common/Collapsable";
import Router from "next/router";

const CreateSurvey: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState("");
  const [displaySurveys, setDisplaySurveys] = useState(false);
  const [surveys, setSurveys] = useState<[]>([]);
  const [surveyQuestions, setQuestions] = useState<[]>([]);
  const axios = require("axios").default;

  const handlePostSurvey = () => {
    console.log(control);
    const filteredQuestions = [];
    surveyQuestions.forEach((question) => {
      const filteredQ = {
        question: question.question,
        type: question.category,
        options: [],
        required: false,
      };
      filteredQuestions.push(filteredQ);
    });
    console.log(filteredQuestions);

    const survey = {
      name: control._formValues.surveyTitle,
      description: control._formValues.surveyDescription,
      visibility: "public",
      questions: filteredQuestions,
    };
    console.log(survey);
    axios({
      method: "post",
      url: "https://q1-survey-service.herokuapp.com/api/surveys/",
      data: survey,
    }).then((data) => {
      console.log(data.data);

      alert("Survey created successfully");
      setTimeout(() => {
        Router.push("/surveys");
      }, 1000);
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
              onSubmit={handleSubmit((data) => {
                console.log(data);
                setData(JSON.stringify(data));
                setQuestions((surv) => [...surv, data]);
                const title = document.getElementById("title");
                title.value = "";
                setValue("question", "");
                console.log(surveyQuestions);
              })}
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "450px",
                gap: "20px",
              }}
            >
              <label style={{ color: theme.colors.gray900 }}>
                Question Data
              </label>
              <input
                id="title"
                style={{
                  backgroundColor: `${theme.colors.gray400}`,
                  font: "inherit",
                  color: `${theme.colors.gray800}`,
                  fontSize: "14px",
                  height: "50px",
                  width: "100%",
                  border: `1px solid ${theme.colors.gray600}`,
                  borderRadius: "6px",
                  padding: "5px",
                }}
                {...register("question", { required: "Required" })}
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
                  padding: "5px",
                }}
              >
                <option value="text">Text Input </option>
                <option value="number">Number</option>
              </select>
              <input
                style={{
                  width: "100%",
                  height: "40px",
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

            <Box style={{ marginTop: "-28px" }}>
              <CollapsibleDemo content={surveyQuestions} />
            </Box>
          </Box>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "1150px",
              gap: "10px",
              paddingLeft: "5em",
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
                padding: "5px",
              }}
              {...register("surveyTitle")}
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
                padding: "5px",
              }}
              {...register("surveyDescription")}
              placeholder="Survey description"
            />
            <button
              style={{
                width: "100%",
                height: "50px",
                background: `${theme.colors.voilet100}`,
                border: `1px solid ${theme.colors.voilet100}`,
                color: "white",
                cursor: "pointer",
                borderRadius: "8px",
                marginTop: "10px",
              }}
              onClick={(e) => {
                e.preventDefault();
                handlePostSurvey();
              }}
            >
              Submit Survey
            </button>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default CreateSurvey;
