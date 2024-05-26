import ContentWrapper from "./ContentWrapper.tsx";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const AnalysisComplete = () => {
  const videoUrl = "https://www.example.com/video.mp4";

  return (
    <ContentWrapper>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            {/*얼굴*/}
            <Stack>
              <Typography>인식된 얼굴</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <img
                    src="https://picsum.photos/200"
                    alt="face1"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    src="https://picsum.photos/200"
                    alt="face1"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    src="https://picsum.photos/200"
                    alt="face1"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    src="https://picsum.photos/200"
                    alt="face1"
                    width="100%"
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack>
              <Typography>인식된 음성</Typography>
              <Grid container>
                <audio
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  controls
                />
                <audio
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  controls
                />
                <audio
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  controls
                />
                <audio
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  controls
                />
              </Grid>
            </Stack>
            <Stack>
              <Typography>인식된 번호판</Typography>
              <Grid container>
                <Typography>12가 5569</Typography>
                <Typography>56해 8441</Typography>
              </Grid>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};

export default AnalysisComplete;