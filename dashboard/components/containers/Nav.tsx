import { Box } from "../common/Box";
import { List } from "../common/List";
import { ListItem } from "../common/ListItem";
import { theme } from "../../styles/theme";
import logo from "../../public/icons/dim-logo.png";
import Image from "next/image";

export const NavBar = () => {
  return (
    <Box
      column
      style={{
        left: "0",
        width: "20%",
        backgroundColor: `${theme.colors.gray500}`,
        height: "100vh",
      }}
    >
      <Image alt="logo" layout="fixed" width={100} height={100} src={logo} />
      <List>
        <ListItem>Surveys</ListItem>
        <ListItem>Analytics</ListItem>
        <ListItem>Templates</ListItem>
        <ListItem>Dashboard</ListItem>
      </List>
    </Box>
  );
};
