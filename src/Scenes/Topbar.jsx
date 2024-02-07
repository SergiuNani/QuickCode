import { useContext, useState, useEffect, useRef } from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TableViewIcon from "@mui/icons-material/TableView";

export const TopbarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [CalcVsRegDialogStatus, setCalcVsRegDialogStatus] = useState(false);
  const [CalcVsRegister, setCalcVsRegister] = useState("Register");
  const [expandLogin, setExpandLogin] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // if (event.altKey && event.key === 'c') {
      //   setCalcVsRegDialogStatus(true)
      //   if (CalcVsRegister == 'Calculator') {
      //     setCalcVsRegister('Register')
      //   } else {
      //     setCalcVsRegister('Calculator')
      //   }
      // }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Box
      sx={{
        bgcolor: colors.primary[200],
        position: "sticky",
        top: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        padding: "0.2rem",
        userSelect: "none",
      }}
    >
      <div></div>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => setSettingsDialogOpen(true)}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setCalcVsRegDialogStatus(true);
          }}
        >
          <TableViewIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopbarComponent;
