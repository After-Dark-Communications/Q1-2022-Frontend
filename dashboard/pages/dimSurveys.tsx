// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../components/containers/Nav";
import styles from "../styles/Home.module.css";
import { Box } from "../components/common/Box";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Text } from "../components/common/Text";

const DisplaySurvey: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [surveys, setSurveys] = useState();
  const getSurveys = async () => {
    setSurveys(await JSON.parse(localStorage.getItem("surveys")));
  };
  useEffect(() => {
    getSurveys().then(() => console.log(surveys));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box row>
        <NavBar />

        <Box
          column
          css={{
            padding: "5em",
            width: "100vw",
          }}
        >
          <h2>Surveys</h2>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            {surveys &&
              surveys.map((survey, i) => {
                return (
                  <div
                    key={survey.title + "i" + i + survey.category}
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
                    <Text>{i + ". " + survey.title}</Text>

                    {survey.category == "txt" ? (
                      <input
                        {...register(`${i}`)}
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
                        key={survey.title + "i" + i + survey.category}
                        {...register(`${i}`)}
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
            <input type="submit"></input>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default DisplaySurvey;
