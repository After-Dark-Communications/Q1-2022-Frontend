import { styled } from "../../styles/theme";

const navBarList = {
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  marginTop: "3em",
};

export const List = styled("ul", {
  variants: {
    navBar: {
      true: navBarList,
    },
  },
});
