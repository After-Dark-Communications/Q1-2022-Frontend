import { Box } from "../common/Box";
import { List } from "../common/List";
import { ListItem } from "../common/ListItem";
import { theme } from "../../styles/theme";
import logo from "../../public/icons/dim-logo.png";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "../../public/SVG/Activity";
import { Home } from "../../public/SVG/Home";

export const NavBar = () => {
  return (
    <Box
      column
      style={{
        left: 0,
        width: "250px",
        backgroundColor: `${theme.colors.gray500}`,
        position: "sticky",
        height: "100vh",
        borderTopRightRadius: "50px",
        borderBottomRightRadius: "50px",
      }}
    >
      <List navBar>
        <Link href="/" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Home />
            <ListItem navBarItem>Home</ListItem>
          </Box>
        </Link>

        <a
          href="https://survey-9.group6.appsemble.app/en/survey"
          target="_blank"
          rel="noreferrer"
        >
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Submit Survey</ListItem>
          </Box>
        </a>

        <Link href="/surveysAppSemble" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Appsemble Surveys</ListItem>
          </Box>
        </Link>

        <Link href="/createSurvey" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Create Survey</ListItem>
          </Box>
        </Link>

        {/* <Link href="/displaySurvey" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Display Survey</ListItem>
          </Box>
        </Link> */}

        <Link href="/surveys" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>DIM Surveys</ListItem>
          </Box>
        </Link>

        {/* <Link href="/surveys" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Templates</ListItem>
          </Box>
        </Link>

        <Link href="/surveys" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Analytics</ListItem>
          </Box>
        </Link> */}
      </List>
    </Box>
  );
};
