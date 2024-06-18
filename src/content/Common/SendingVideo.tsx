import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface Props {
  remainMilliSecond: number;
}

const SendingVideo: FC<Props> = ({remainMilliSecond}) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const percentPerSecond = 100 / (remainMilliSecond / 1000);
        const refreshPerSecond = 10;
        setInterval(() => {
            setPercent(prev => Math.min(prev + (percentPerSecond / refreshPerSecond), 99))
        }, 1000 / refreshPerSecond);
    }, []);
    
  return (
    <Stack sx={{width: '100%', height: '100%', p: 2}} alignItems='center' justifyContent='center' gap={2}>
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={11}>
                    <LinearProgress value={percent} variant="determinate"/>
            </Grid>
                <Grid item xs={1}>
                    <Typography marginLeft='auto' variant="body2" color='grey'>{percent.toFixed(0)}%</Typography>
                </Grid>
            </Grid>
      <Box>
        <Typography textAlign='center'>
            AI가 비디오를 분석하고 있습니다.
            <br/>
            잠시만 기다려주세요
        </Typography>
      </Box>
    </Stack>
  );
};

export default SendingVideo;