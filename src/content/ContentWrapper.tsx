import Stack from "@mui/material/Stack";
import { HEADER_HEIGHT } from "../layout/Header.tsx";
import { FC, PropsWithChildren } from "react";

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      alignItems="center"
      sx={{
        width: "100%",
        height: `calc(100% - ${HEADER_HEIGHT}px)`,
      }}
    >
      {children}
    </Stack>
  );
};

export default ContentWrapper;