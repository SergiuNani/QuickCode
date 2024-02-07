import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import TopbarComponent from "./Scenes/Topbar";
import SidebarComponent from "./Scenes/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import HomeWindow from "./Scenes/Home";
import DebugWindow from "./Scenes/Debug";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ display: "flex" }}>
            <SidebarComponent isSidebar={isSidebar} />

            <main style={{ flexGrow: 1, position: "relative", height: "100%" }}>
              <TopbarComponent setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<HomeWindow />} />
                <Route path="/home" element={<HomeWindow />} />
                <Route path="/debug" element={<DebugWindow />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
