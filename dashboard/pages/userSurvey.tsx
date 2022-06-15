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

const UserSurvey: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [surveys, setSurveys] = useState();
  const getSurveys = async () => {
    setSurveys(await JSON.parse(localStorage.getItem("surveys")));
  };
  useEffect(() => {
    getSurveys().then(() => console.log(surveys));
  }, []);

  return (
    <Box row style={{ height: "100vh",padding:'10em' }}>
      {/* <NavBar /> */}
      <Box>
        <h1>yo</h1>
      </Box>
    </Box>
  );
};

export default UserSurvey;
