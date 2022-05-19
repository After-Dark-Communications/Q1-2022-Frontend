import { styled, theme } from "../../styles/theme";

export const navBarItem = {
  cursor: "pointer",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "200px",
  color: `${theme.colors.gray800}`,
  transition: "color 0.5s",
  fontSize: "14px",
  "&:hover": {
    color: `${theme.colors.gray900}`,
  },
};

export const ListItem = styled("li", {
  listStyle: "none",

  variants: {
    navBarItem: {
      true: navBarItem,
    },
    active: {
      true: { color: `${theme.colors.gray900} !important` },
    },
  },
  length: 0,
});
