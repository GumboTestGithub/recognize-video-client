import ContentWrapper from "../ContentWrapper.tsx";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";

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
    <ContentWrapper>
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={11}>
                    <LinearProgress value={percent} variant="determinate"/>
            </Grid>
                <Grid item xs={1}>
                    <Typography marginLeft='auto' variant="body2" color='grey'>{percent}%</Typography>
                </Grid>
            </Grid>
      <Box>
        <Typography>AI가 영상을 분석 중입니다.</Typography>
        <Typography>잠시만 기다려주세요.</Typography>
      </Box>
    </ContentWrapper>
  );
};

export default SendingVideo;