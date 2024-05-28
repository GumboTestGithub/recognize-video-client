import Box from "@mui/material/Box";
import { FC } from "react";
import IconButton from "@mui/material/IconButton";

import BackArrow from "../asset/icon/back.png";
import { keyframes } from "@emotion/react";

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

interface Props {
  onClick: () => void;
}

const HomeButton: FC<Props> = ({onClick}) => {
  return <Box
  sx={{
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  }}
  onClick={onClick}
  >
    <IconButton sx={{
      animation: `${moveUpDown} 2s infinite`,
    }}>
      <img src={BackArrow} alt="home" style={{width: '40px', height: '40px'}} />
    </IconButton>
  </Box>;
};

export default HomeButton;
