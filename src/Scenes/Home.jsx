import {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  memo,
  createContext,
} from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Dialog,
} from "@mui/material";
import { tokens } from "../theme";
import { FirmwareAddresses_FA00G, FW_actualAddresses_FA00G } from "./Data";
import { ButtonTransparent } from "./Components";

export const HomeWindow = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showBtnOne, setShowBtnOne] = useState(false);

  return (
    <section
      style={{
        fontSize: "1.2rem",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Home
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "3rem",
          gap: "1rem",
        }}
      >
        <p> - FW addresses vs FA00G_variables.cfg</p>
        <ButtonTransparent
          sx={{
            color: `${colors.green[400]}`,
            background: `${colors.primary[300]}`,
            border: `1px solid ${colors.primary[400]}`,
            fontSize: "1rem",
            "&:hover": {
              background: `${colors.primary[200]}`,
              color: `${colors.red[200]}`,
            },
          }}
          onClick={() => {
            setShowBtnOne(true);
          }}
        >
          SHOW
        </ButtonTransparent>
      </div>

      {showBtnOne && (
        <DialogComponent
          open={showBtnOne}
          setOpen={setShowBtnOne}
          component={<Compare_variablesCFG_to_FWadresses_component />}
        />
      )}
    </section>
  );
};

export default HomeWindow;

const DialogComponent = ({ open, setOpen, component }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "none",
        },
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "1rem",
          height: "130vh",
          border: `2px solid ${colors.yellow[500]}`,
          background: `${colors.primary[200]}`,
          overflow: "auto",
        }}
      >
        {component}
      </div>
    </Dialog>
  );
};

function Compare_variablesCFG_to_FWadresses_component() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var variablesCfg_extract = [];
  var fwAddresses_extract = [];
  var matchMaker = [];

  var tempArray = FirmwareAddresses_FA00G.split("\n");
  tempArray.forEach((el) => {
    if (el != "") {
      var elSplitted = el.split(/\s+/g);
      var elSplittedFiltered = elSplitted.filter((el) => {
        return el != "";
      });
      variablesCfg_extract.push(elSplittedFiltered);
    }
  });
  var tempArray = FW_actualAddresses_FA00G.split("\n");

  tempArray.forEach((el) => {
    if (el.match("LSW_ADDRESS_OF")) {
      var separatedRow = el.split("//");

      var name = separatedRow[0].match(/\((.*?)\)/)[1]; // match string between ( )
      var address = separatedRow[1].match(/\[(.*?)\]/)[1]; // match string between [ ]
      fwAddresses_extract.push([name, address]);
    }
  });

  variablesCfg_extract.forEach((varRow) => {
    var found_flag = 0;
    for (const fwRow of fwAddresses_extract) {
      var varAddy = varRow[2].toUpperCase();
      if (varAddy.slice(0, 3) == "@0X") varAddy = varAddy.slice(3);
      if (varAddy.length == 3) varAddy = "0" + varAddy;
      var fwAddy = fwRow[1].toUpperCase();
      if (fwAddy.slice(0, 2) == "0X") fwAddy = fwAddy.slice(2);
      if (fwAddy.length == 3) fwAddy = "0" + fwAddy;

      if (varAddy == fwAddy) {
        found_flag = 1;
        matchMaker.push([varRow[1], varAddy, fwRow[0]]);
        break;
      }
    }

    if (!found_flag) {
      //if false
      matchMaker.push([varRow[1], varAddy, "-"]);
    }
  });

  // [VAR_name,address, fw_name ]
  return (
    <section
      style={{
        background: `${colors.primary[200]}`,
      }}
    >
      {matchMaker.map((el, idx) => (
        <div key={idx} style={{ display: "flex", gap: "2rem" }}>
          <p style={{ color: `${colors.primary[500]}`, minWidth: "6rem" }}>
            {el[0]}
          </p>
          <p style={{ color: `${colors.green[100]}`, minWidth: "6rem" }}>
            {el[1]}
          </p>
          <p style={{ color: `${colors.blue[500]}`, minWidth: "6rem" }}>
            {el[2]}
          </p>
        </div>
      ))}
    </section>
  );
}
