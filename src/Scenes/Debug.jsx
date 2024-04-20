import { useState, useEffect, useMemo } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";
export const DebugWindow = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>DebugWindow</h1>
    </section>
  );
};

export default DebugWindow;

export const DrawerComponent = ({ title, component }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDrawerOpen, closeDrawer] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.altKey && event.key === "`") {
        closeDrawer((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  function handleClose() {
    closeDrawer((prev) => {
      !prev;
    });
  }

  return (
    <Box className="relative">
      <Box
        style={{
          position: "fixed",
          width: "25rem",
          backgroundColor: "#333", //Inocent comment
          color: "white",
          borderRadius: "1rem",
          height: "97vh",
          padding: "20px",
          boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.2)",
          transition: "right 0.3s ease-in-out",
          overflow: "auto",
          background: `${colors.primary[100]}`,
          border: `1px solid ${colors.grey[400]}`,
          zIndex: 2,
          right: isDrawerOpen ? "0" : "-200rem",
          justifyContent: "center",
          top: "0",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ borderBottom: `1px solid ${colors.grey[400]}` }}
        >
          <Typography variant="h3">{title} </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
        {component}
      </Box>
    </Box>
  );
};

//------DONT NEED-------------------------------------------
export const ColorsComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const colorElements = useMemo(() => {
    const Elements = [];
    for (const colorCategory in colors) {
      const colorShade = colors[colorCategory];

      for (const shade in colorShade) {
        const colorValue = colorShade[shade];
        Elements.push(
          <Box
            key={`${colorCategory}-${shade}`}
            sx={{ marginBottom: "0.4rem" }}
          >
            <Box
              style={{
                background: `${colorValue}`,
                width: "10rem",
                height: "2rem",
              }}
            ></Box>
            <p
              style={{ margin: "0rem" }}
            >{`${colorCategory} - ${shade}: ${colorValue}`}</p>
          </Box>
        );
      }
    }
    return Elements;
  }, [colors]);

  const firstHalf = colorElements.slice(0, Math.ceil(colorElements.length / 2));
  const secondHalf = colorElements.slice(Math.ceil(colorElements.length / 2));
  return (
    <Box
      style={{
        zoom: "0.9",
        width: "fit-content", // Adjust width to content
        margin: "auto", // Center horizontally
      }}
    >
      <Typography variant="h4">
        {`import {useTheme} from '@mui/material'`}{" "}
      </Typography>
      <Typography variant="h4">{`import {tokens} from '../theme' `}</Typography>
      <Typography variant="h4">{`const theme = useTheme()`}</Typography>
      <Typography variant="h4">
        {`const colors = tokens(theme.palette.mode)`}{" "}
      </Typography>
      <Box display="flex" gap={5}>
        <div>{firstHalf}</div>
        <div>{secondHalf}</div>
      </Box>
    </Box>
  );
};
