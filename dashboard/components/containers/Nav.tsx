import { Box } from "../common/Box";
import { List } from "../common/List";
import { ListItem } from "../common/ListItem";
import { theme } from "../../styles/theme";
import Link from "next/link";
import { Home } from "../../public/SVG/Home";
import { Table } from "../../public/SVG/Table";
import { Add } from "../../public/SVG/Add";
import { Analytics } from "../../public/SVG/Analytics";
import { useRouter } from "next/router";
import { EmailSvg } from "../../public/SVG/Email";

export const NavBar = () => {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <Box
      column
      style={{
        left: 0,
        width: "190px",
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
            <ListItem navBarItem active={pathname == "/"}>
              Home
            </ListItem>
          </Box>
        </Link>

        <Link href="/createSurvey" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Add />
            <ListItem navBarItem active={pathname == "/createSurvey"}>
              Create survey
            </ListItem>
          </Box>
        </Link>

        <Link href="/surveys" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <Table />
            <ListItem navBarItem active={pathname == "/surveys"}>
              Surveys
            </ListItem>
          </Box>
        </Link>

        <Link href="/emails" passHref>
          <Box row css={{ backgroundColor: "transparent", gap: "10px" }}>
            <EmailSvg />
            <ListItem navBarItem active={pathname == "/emails"}>
              Emails
            </ListItem>
          </Box>
        </Link>

        <Link href="/analytics" passHref>
          <Box
            row
            css={{
              backgroundColor: "transparent",
              gap: "10px",
              marginLeft: "-2px",
            }}
          >
            <Analytics />
            <ListItem navBarItem active={pathname == "/analytics"} css={{ marginLeft: "-4px" }}>
              {" "}
              Analytics
            </ListItem>
          </Box>
        </Link>
        {/* <Link href="/surveys" passHref>
          <Box
            row
            css={{
              backgroundColor: "transparent",
              gap: "10px",
              marginLeft: "-2px",
            }}
          >
            <Settings width={"32"} />
            <ListItem navBarItem css={{ marginLeft: "-4px" }}>
              {" "}
              Settings
            </ListItem>
          </Box>
        </Link> */}
      </List>
    </Box>
  );
};
