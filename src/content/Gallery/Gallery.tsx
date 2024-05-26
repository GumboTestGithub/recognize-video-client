import { useState } from "react";
import ContentWrapper from "../ContentWrapper.tsx";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SendingVideo from "../SendingVideo.tsx";
import AnalysisComplete from "../AnalysisComplete.tsx";
import SelectFile from "./SelectFile.tsx";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const TEST_MILLI_SECOND = 5000;

const Gallery = () => {
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
                        <StepLabel>동영상 선택</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>식별화</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>결과</StepLabel>
                    </Step>
                </Stepper>
                {activeStep === 0 && <SelectFile sendVideo={sendVideo} />}
                {activeStep === 1 && <SendingVideo remainMilliSecond={TEST_MILLI_SECOND} />}
                {activeStep === 2 && <AnalysisComplete />}
            </Box>
        </ContentWrapper>
    );
};

export default Gallery;