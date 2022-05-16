import { styled } from "../../styles/theme";

const navBarList = {
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  marginTop: "4em",
  marginLeft:'-20px'

};

export const List = styled("ul", {
  variants: {
    navBar: {
      true: navBarList,
    },
  },
  length: 0
});
