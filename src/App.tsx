import Stack from "@mui/material/Stack";
import HomeButton from "./layout/HomeButton.tsx";
import Content, { CurrentContent } from "./content/Content.tsx";
import { useState } from "react";

const App = () => {
  const [currentContent, setCurrentContent] = useState<CurrentContent>("main");

  const handleHomeClick = () => {
    setCurrentContent("main");
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack
        position="relative"
        width="100vw"
        maxWidth="450px"
        height="100%"
        sx={{
          position: "relative",
          width: "100vw",
          maxWidth: "450px",
          height: "100%",
        }}
      >
        {currentContent !== "main" && <HomeButton onClick={handleHomeClick} />}
        <Content
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
      </Stack>
    </Stack>
  );
};

export default App;
