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
        width: "220px",
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

        <Link href="/surveysAppSemble" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Surveys</ListItem>
          </Box>
        </Link>

        <Link href="/surveys" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Activity />
            <ListItem navBarItem>Next Sprint</ListItem>
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
