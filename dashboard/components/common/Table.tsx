import { styled } from "@stitches/react";
import { theme } from "../../styles/theme";

export const TableRow = styled("tr", {
  backgroundColor: theme.colors.gray400,
});

export const Table = styled("table", {
  width: "50vw",
  "tr:nth-child(even)": { background: theme.colors.gray600 },
  borderRadius: "30px",
  th: {
    textAlign: "center",
    padding: "10px",
    color: theme.colors.voilet100,
  },
  td: {
    textAlign: "center",
    padding: "25px 10px",
    borderRadius: "5px",
  },
});
