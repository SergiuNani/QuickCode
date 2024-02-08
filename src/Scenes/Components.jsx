import { Button } from "@mui/material";

export const ButtonTransparent = ({ children, onClick, sx }) => {
  const defaultSx = {
    background: "transparent",
    "&:hover": {
      background: "transparent",
    },
    textTransform: "none",
    outline: "none",
  };
  return (
    <Button variant="contained" onClick={onClick} sx={{ ...defaultSx, ...sx }}>
      {children}
    </Button>
  );
};
