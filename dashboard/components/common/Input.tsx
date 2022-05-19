import { styled } from "@stitches/react";
import React from "react";

import { theme } from "../../styles/theme";

export const Input = styled("input", {
  backgroundColor: `${theme.colors.gray400}`,
  minWidth: "420px",
  maxWidth: "450px",
  font: "inherit",
  color: `${theme.colors.gray800}`,
  fontSize: "14px",
  height: "50px",
  width: "100%",
  border: `1px solid ${theme.colors.gray600}`,
  borderRadius: "6px",
  marginBottom: "20px",
  padding: "0 5px",
});
