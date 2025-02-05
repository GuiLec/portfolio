import { Box, Typography } from "@mui/material";

interface HeroSectionProps {
  title: string;
  imageUrl: string;
}

export const HeroSection = ({ title, imageUrl }: HeroSectionProps) => {
  return (
    <Box
      sx={{
        height: [200, 300, 400, 400, 600],
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "common.white",
        textAlign: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        padding: 4,
      }}
    >
      <Typography
        variant={"h2"}
        component="h1"
        sx={{ zIndex: 1 }}
        fontWeight="bold"
      >
        {title}
      </Typography>
    </Box>
  );
};
