import Stack from "@mui/material/Stack";
import Header from "./layout/Header.tsx";
import Content from "./content/Content.tsx";

const App = () => {
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
        <Header />
        <Content />
      </Stack>
    </Stack>
  );
};

export default App;
