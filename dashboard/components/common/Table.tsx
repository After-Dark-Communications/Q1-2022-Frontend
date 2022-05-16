import { styled } from "@stitches/react";
import { theme } from "../../styles/theme";

export const TableRow = styled("tr", {
  backgroundColor: theme.colors.gray400,
  length: 0,
});

export const Table = styled("table", {
  width: "100vw",
  "tr:nth-child(even)": { background: theme.colors.gray600 },

  th: {
    textAlign: "center",
    padding: "10px",
    color: theme.colors.voilet100,
  },
  td: {
    textAlign: "center",
    padding: "15px 10px",
  },
  length: 0,
});
