import ContentWrapper from "../ContentWrapper.tsx";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { useState } from "react";
import SendingVideo from "../SendingVideo.tsx";
import VideoRecord from "./VideoRecord.tsx";
import AnalysisComplete from "../AnalysisComplete.tsx";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const TEST_MILLI_SECOND = 5000;

const Camera = () => {
  const [activeStep, setActiveStep] = useState(0);

  const sendVideo = async () => {
      setActiveStep(1);
      await sleep(TEST_MILLI_SECOND);
      setActiveStep(2);
  }

  return (
    <ContentWrapper>
      <Box
        sx={{
          width: "100%",
          px: "30px",
          boxSizing: "border-box",
        }}
      >
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>촬영</StepLabel>
          </Step>
          <Step>
            <StepLabel>식별화</StepLabel>
          </Step>
          <Step>
            <StepLabel>결과</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && <VideoRecord sendVideo={sendVideo} />}
        {activeStep === 1 && <SendingVideo remainMilliSecond={TEST_MILLI_SECOND} />}
        {activeStep === 2 && <AnalysisComplete />}
      </Box>
    </ContentWrapper>
  );
};

export default Camera;