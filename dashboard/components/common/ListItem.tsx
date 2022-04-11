import { styled } from "../../styles/theme";

export const navBarItem = {
  cursor: "pointer",
  alignSelf: "center",
  justifyContent: "space-between",
  width: "200px",
};

export const ListItem = styled("li", {
  listStyle: "none",

  variants: {
    navBarItem: {
      true: navBarItem,
    },
  },
});
