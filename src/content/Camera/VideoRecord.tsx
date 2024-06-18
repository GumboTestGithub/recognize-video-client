import { FC, useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Webcam from "react-webcam";

const getSupportedMimeType = () => {
  const mimeTypes = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4", // Note: this might not be supported by MediaRecorder in some browsers
    "video/ogg",
  ];

  for (const mimeType of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }
  return "";
};

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  onSendClick: () => void;
}

const VideoRecord: FC<Props> = ({ file, setFile, onSendClick }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [facingMode, setFacingMode] = useState<string>('user'); // 'user' for front camera, 'environment' for back camera
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    const handleStartCaptureClick = useCallback(() => {
        if (webcamRef.current && webcamRef.current.stream) {
            setIsRecording(true);
            setRecordedChunks([]);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: getSupportedMimeType(),
            });
            mediaRecorderRef.current.addEventListener(
                'dataavailable',
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, setIsRecording, mediaRecorderRef]);

    const handleDataAvailable = useCallback(
        ({ data }: BlobEvent) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }, [mediaRecorderRef, setIsRecording]);

    useEffect(() => {
        if (!isRecording && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const mimeType = getSupportedMimeType();
            const file = new File([blob], `recorded-video.${mimeType.split('/')[1]}`, { type: mimeType });
            setFile(file);
            setRecordedChunks([]);
        }
    }, [isRecording, recordedChunks, setFile]);

    const handleSwitchCamera = useCallback(() => {
        setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    }, []);

    return (
        <Stack sx={{ width: '100%', height: '100%', p: 2 }} justifyContent='center' alignItems='center' gap={5}>
            {!file ? (
                <>
                    <Webcam
                        ref={webcamRef}
                        videoConstraints={{
                            facingMode,
                        }}
                        style={{ maxWidth: '90vw', height: 'auto', maxHeight: '50vh' }}
                    />
                    <Stack gap={1} sx={{width: '100%'}}>
                    <Button fullWidth variant='contained' color='secondary' onClick={handleSwitchCamera}>카메라 전환</Button>
                    {isRecording ? (
                        <Button onClick={handleStopCaptureClick} fullWidth variant='contained' color='warning'>촬영 종료</Button>
                    ) : (
                        <Button onClick={handleStartCaptureClick} fullWidth variant='contained'>촬영 시작</Button>
                    )}
                    </Stack>
                </>
            ) : (
                <Stack sx={{width: '100%'}} alignItems='center' gap={2}>
                    <video src={URL.createObjectURL(file)} controls style={{ maxWidth: '90vw', height: 'auto', maxHeight: '50vh' }}/>
                    <Stack flexDirection='row' sx={{width: '100%'}} gap={1} justifyContent='center'>
                        <Button onClick={() => setFile(null)} fullWidth variant='contained' color='error'>재촬영</Button>
                        <Button onClick={onSendClick} fullWidth variant='contained' >전송</Button>
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
}

export default VideoRecord;