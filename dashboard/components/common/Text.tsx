import { styled, theme } from "../../styles/theme";

export const surveyItemCSS = {
  font: theme.fonts.primary,
  alignSelf: "center",
};

export const Text = styled("p", {
  variants: {
    survey: {
      true: {
        ...surveyItemCSS,
      },
    },
  },
});
