import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ApiResponse } from "../../service/uploadVideo.ts";
import { FC } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

interface Props {
  result: ApiResponse;
}

const Video = styled.video`
    width: auto;
    height: 30vh;
    object-fit: cover;
`

const Result: FC<Props> = ({result}) => {

  const { videoUrl, audioUrls, imageUrls, plateNumbers } = result;

  return (
      <Stack sx={{width: '100%', height: '100%', p: 2, overflow: 'scroll', alignItems: 'center'}} gap={2}>
          <Box flexShrink={0}>
            <Video controls>
              <source src={videoUrl} type="video/mp4" />
            </Video>
          </Box>
          <Stack gap={2} sx={{width: '100%', p: 2, borderRadius: '10px', backgroundColor: '#F6F6F6FF'}}>
        <Typography>Recognized Face</Typography>
        <Grid container spacing={1.5}>
          {imageUrls.map((url, index) => (
            <Grid key={index + url} item xs={6}>
              <img src={url} alt={`face${index}`} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Stack>
          <Stack gap={2} sx={{width: '100%', p: 2, borderRadius: '10px', backgroundColor: '#F6F6F6FF'}}>
        <Typography>Recognized Voice</Typography>
        <Stack gap={1.5}>
          {audioUrls.map((url, index) => (
            <audio key={index} src={url} controls />
          ))}
        </Stack>
      </Stack>
          <Stack gap={2} sx={{width: '100%', p: 2, borderRadius: '10px', backgroundColor: '#F6F6F6FF'}}>
        <Typography>Recognized Number Plate</Typography>
        <Grid container spacing={1}>
          {plateNumbers.map((plateNumber, index) => (
              <Grid item xs={6} key={index + plateNumber} >
            <Typography sx={{border: '4px solid black', borderRadius: '4px', display: 'flex', justifyContent: 'center', padding: 1}} fontSize='20px' fontWeight='bold'>{plateNumber}</Typography>
              </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Result;