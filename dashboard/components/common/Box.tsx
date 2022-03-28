import { styled, theme } from "../../styles/theme";
import { animated } from "@react-spring/web";

export const flexBox = {
  display: "flex",
};

export const boxCss = {
  color: theme.colors.gray900,
  backgroundColor: theme.colors.gray100,
  transition: "background-color 200ms ease, color 200ms ease",
};

export const Box = styled(animated.div, {
  ...boxCss,
  variants: {
    row: {
      true: {
        ...flexBox,
        flexDirection: "row",
      },
    },
    column: {
      true: {
        ...flexBox,
        flexDirection: "column",
      },
    },
    spaceAround: {
      true: {
        ...flexBox,
        justifyContent: "space-around",
      },
    },
    center: {
      true: {
        ...flexBox,
        justifyContent: "center",
      },
    },
  },
});
