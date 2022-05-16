import { styled, theme } from "../../styles/theme";

export const navBarItem = {
  cursor: "pointer",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "200px",
  transition: "color 0.5s",
  fontSize: "12px",
  "&:hover": {
    color: `${theme.colors.voilet100}`,
  },
};

export const ListItem = styled("li", {
  listStyle: "none",

  variants: {
    navBarItem: {
      true: navBarItem,
    },
  },
});
