import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SendingVideo from "../Common/SendingVideo.tsx";
import Result from "../Common/Result.tsx";
import SelectFile from "./SelectFile.tsx";
import {
  calculateUploadTime,
  uploadVideo,
  UploadVideoResult,
} from "../../service/uploadVideo.ts";
import Stack from "@mui/material/Stack";

const Gallery = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [remainMilliSecond, setRemainMilliSecond] = useState(0);
  const [result, setResult] = useState<UploadVideoResult | null>(null);

  const handleVideoSendClick = async () => {
    if (file) {
      try {
        setRemainMilliSecond(calculateUploadTime(file));
        setActiveStep(1);
        const result = await uploadVideo(file);
        setResult(result);
        setActiveStep(2);
      } catch {
        alert("Failed to upload video");
        setActiveStep(0);
      }
    }
  };

  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack sx={{ height: "50px" }} justifyContent="center">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>선택</StepLabel>
          </Step>
          <Step>
            <StepLabel>분석</StepLabel>
          </Step>
          <Step>
            <StepLabel>결과</StepLabel>
          </Step>
        </Stepper>
      </Stack>
      <Stack sx={{ position: "relative", height: "calc(100vh - 50px)" }}>
        {activeStep === 0 && (
          <SelectFile
            file={file}
            setFile={setFile}
            onSendClick={handleVideoSendClick}
          />
        )}
        {activeStep !== 0 &&
          (result === null ? (
            <SendingVideo remainMilliSecond={remainMilliSecond} />
          ) : (
            <Result file={file!} result={result} />
          ))}
      </Stack>
    </Stack>
  );
};

export default Gallery;