import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BugReportIcon from "@mui/icons-material/BugReport";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    setSelected(title);
  };

  return (
    <div
      style={{
        color: colors.grey[100],
      }}
    >
      <MenuItem active={selected === title} onClick={handleClick} icon={icon}>
        <Typography>{title}</Typography>
      </MenuItem>
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }} />
    </div>
  );
};

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Home");

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[200]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "0.5rem 1rem 0.2rem 1rem !important",
        },
        "& .ps-menu-button:hover": {
          color: `${colors.green[400]} `,
          background: `${colors.primary[300]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.green[400]} !important`,
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Box
          sx={{
            background: `${colors.primary[100]}`,
          }}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3">ADMINIS</Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Home"
                to="/home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Debug"
                to="/debug"
                icon={<BugReportIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
