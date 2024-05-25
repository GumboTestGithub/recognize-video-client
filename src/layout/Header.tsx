import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

export const HEADER_HEIGHT = 60;

const Header = () => {
  return <Box
  sx={{
    height: `${HEADER_HEIGHT}px`,
    display: "flex",
    alignItems: "center",
    boxSizing: 'border-box',
    padding: '12px'
  }}>
    <CameraAltRoundedIcon fontSize='medium' />
    <Typography variant='h6' sx={{ml: '10px'}}>
      INDENTITYSAFE
    </Typography>
  </Box>;
};

export default Header;
