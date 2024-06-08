import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { UploadVideoResult } from "../../service/uploadVideo.ts";
import { FC, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { deidentification } from "../../service/deidentification.ts";

interface Props {
  file: File;
  result: UploadVideoResult;
}

const Video = styled.video`
    width: 100%;
    height: auto;
    object-fit: cover;
`

const Result: FC<Props> = ({file, result}) => {
    const { uuid, voices, faces, licensePlates } = result;

    const [selectedFaces, setSelectedFaces] = useState<number[]>([]);
    const [selectedLicensePlates, setSelectedLicensePlates] = useState<number[]>([]);

    const handleFaceClick = (index: number) => {
        if (selectedFaces.includes(index)) {
            setSelectedFaces(selectedFaces.filter(i => i !== index));
        } else {
            setSelectedFaces([...selectedFaces, index]);
        }
    }

    const handleLicensePlateClick = (index: number) => {
        if (selectedLicensePlates.includes(index)) {
            setSelectedLicensePlates(selectedLicensePlates.filter(i => i !== index));
        } else {
            setSelectedLicensePlates([...selectedLicensePlates, index]);
        }
    }

    const [isApplied, setIsApplied] = useState<boolean>(false);
    const [deidentifiedUrl, setDeidentifiedUrl] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeidentificationClick = async () => {
        try {
            setDeidentifiedUrl(undefined)
            setIsLoading(true)
            setIsApplied(false)
            const url = await deidentification({
                uuid: uuid,
                faces: selectedFaces,
                license_plates: selectedLicensePlates,
                voices: []
            })
            setIsLoading(false)
            setDeidentifiedUrl(url)
        } catch {
            alert("Failed to de-identify video")
            setIsLoading(false)
            setDeidentifiedUrl(undefined)
        }

    }

    const handleApplyClick = () => {
        setIsApplied(true)
    }

    const handleDownloadClick = () => {
        const anchor = document.createElement('a');
        anchor.href = deidentifiedUrl!;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const handleShareClick = async () => {
            await navigator.clipboard.writeText(deidentifiedUrl!);
            alert('URL has been copied to your clipboard!');
    }

    const currentVideoUrl = isApplied ? deidentifiedUrl : URL.createObjectURL(file)

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        overflow: "scroll",
        alignItems: "center",
      }}
      gap={2}
    >
      <Box flexShrink={0}>
        <Video
          controls
        >
            <source key={Date.now()} src={currentVideoUrl} type="video/mp4"></source>
        </Video>
      </Box>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography>Recognized Face</Typography>
        <Grid container spacing={1.5}>
          {faces.map(({ index, url }) => (
            <Grid
              sx={{ position: "relative", boxSizing: "borderBox" }}
              key={index + url}
              item
              xs={6}
              onClick={() => handleFaceClick(index)}
            >
              {selectedFaces.includes(index) && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Selected
                </Box>
              )}
              <img src={url} alt={`face${index}`} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography>Recognized Voice</Typography>
        <Stack gap={1.5}>
          {voices.map(({ index, url }) => (
            <audio key={index} src={url} controls />
          ))}
        </Stack>
      </Stack>
      <Stack
        gap={2}
        sx={{
          width: "100%",
          p: 2,
          borderRadius: "10px",
          backgroundColor: "#F6F6F6FF",
        }}
      >
        <Typography>Recognized Number Plate</Typography>
        <Grid container spacing={1}>
          {licensePlates.map(({ index, url }) => (
            <Grid
              key={index + url}
              item
              xs={6}
              onClick={() => handleLicensePlateClick(index)}
              sx={{
                position: "relative",
              }}
            >
              {selectedLicensePlates.includes(index) && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Selected
                </Box>
              )}
              <img src={url} alt={`face${index}`} width="100%" />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        onClick={handleDeidentificationClick}
        disabled={isLoading}
      >
        De-Identification
      </Button>
      {isLoading && <Typography>De-Identification in progress...</Typography>}
      {deidentifiedUrl && (
        <>
          <Button
            variant="contained"
            disabled={isApplied}
            onClick={handleApplyClick}
            fullWidth
          >
            {isApplied ? "Applied" : "Apply De-Identification"}
          </Button>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleDownloadClick}
              >
                Download
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                color="info"
                onClick={handleShareClick}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default Result;