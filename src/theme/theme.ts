import { createTheme } from "@mui/material";

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

export const theme = createTheme({
  breakpoints,
  typography: {
    h1: {
      fontSize: "3rem",
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: "4rem",
      },
    },
    h2: {
      fontSize: "2rem",
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: "3rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1.25rem",
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontSize: "1rem",
      [`@media (min-width:${breakpoints.values.md}px)`]: {
        fontSize: "1.25rem",
      },
    },
  },
});
