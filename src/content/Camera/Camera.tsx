import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import SendingVideo from "../Common/SendingVideo.tsx";
import VideoRecord from "./VideoRecord.tsx";
import Result from "../Common/Result.tsx";
import {
  ApiResponse,
  TEST_MILLI_SECOND,
  uploadVideo,
} from "../../service/uploadVideo.ts";
import Stack from "@mui/material/Stack";

const Camera = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [remainMilliSecond, setRemainMilliSecond] = useState(0);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleVideoSendClick = async () => {
    if (file) {
      setRemainMilliSecond(TEST_MILLI_SECOND);
      setActiveStep(1);
      const response = await uploadVideo(file);
      setResult(response);
      setActiveStep(2);
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
            <StepLabel>Shoot</StepLabel>
          </Step>
          <Step>
            <StepLabel>Analyze</StepLabel>
          </Step>
          <Step>
            <StepLabel>Result</StepLabel>
          </Step>
        </Stepper>
      </Stack>
      <Stack sx={{ position: "relative", height: "calc(100vh - 50px)" }}>
        {activeStep === 0 && (
          <VideoRecord
            file={file}
            setFile={setFile}
            onSendClick={handleVideoSendClick}
          />
        )}
        {activeStep !== 0 &&
          (result === null ? (
            <SendingVideo remainMilliSecond={remainMilliSecond} />
          ) : (
            <Result result={result} />
          ))}
      </Stack>
    </Stack>
  );
};

export default Camera;