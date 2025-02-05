"use client";
import { theme } from "@/theme/theme";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";

export const ThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
