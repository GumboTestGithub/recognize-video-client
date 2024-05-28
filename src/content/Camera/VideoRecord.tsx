import { FC, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  onSendClick: () => void;
}

const VideoRecord: FC<Props> = ({ file, setFile, onSendClick }) => {
    const [recording, setRecording] = useState(false);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        let animationFrameId: number;

        const drawCanvas = () => {
            if (canvasRef.current && streamRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                const video = document.createElement('video');
                video.srcObject = streamRef.current;
                video.play();

                video.onloadedmetadata = () => {
                    if (canvasRef.current) {
                        canvasRef.current.width = video.videoWidth;
                        canvasRef.current.height = video.videoHeight;

                        const drawFrame = () => {
                            if (ctx) {
                                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                                animationFrameId = requestAnimationFrame(drawFrame);
                            }
                        };
                        drawFrame();
                    }
                };
            }
        };

        if (recording) {
            drawCanvas();
        } else {
            cancelAnimationFrame(animationFrameId);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [recording, facingMode]);

    const startRecording = async () => {
        setFile(null);
        if (canvasRef.current) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode,
                    }
                });

                streamRef.current = stream;

                let options;
                if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                    options = { mimeType: 'video/webm; codecs=vp9' };
                } else if (MediaRecorder.isTypeSupported('video/webm')) {
                    options = { mimeType: 'video/webm' };
                } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                    options = { mimeType: 'video/mp4', videoBitsPerSecond: 100000 };
                } else {
                    console.error("No suitable mimetype found for this device");
                    return;
                }

                mediaRecorderRef.current = new MediaRecorder(stream, options);

                const chunks: Blob[] = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(chunks, {
                        type: 'video/webm',
                    });
                    setFile(new File([blob], 'recording.webm', { type: 'video/webm' }));
                };

                mediaRecorderRef.current.start();
                setRecording(true);
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && streamRef.current) {
            mediaRecorderRef.current.stop();
            streamRef.current.getTracks().forEach(track => track.stop());
            setRecording(false);
        }
    };

    const changeFacingMode = async () => {
        setFacingMode(facingMode === 'user' ? 'environment' : 'user');
        await startRecording();
    }

    if(file) {
        console.log(URL.createObjectURL(file))
    }

    return (
        <Stack sx={{width: '100%', height: '100%', p: 2}} justifyContent='center' alignItems='center' gap={5}>
            {!file ? (
                <>
                    <canvas ref={canvasRef} style={{height: '50vh',  width: 'auto'}}/>
                    {recording ? (
                            <Button onClick={stopRecording} fullWidth variant='contained' color='warning'>record stop</Button>
                    ) : (
                        <Button onClick={startRecording} fullWidth variant='contained'>record start</Button>
                    )}
                </>
                )
                : (
                    <Stack gap={2}>
                        <video src={URL.createObjectURL(file)} controls style={{ width: '90vw', height: 'auto'  }} />
                        <Button fullWidth variant='contained' color='secondary' onClick={changeFacingMode}>change camera</Button>
                        <Stack flexDirection='row' gap={1} justifyContent='center'>
                            <Button onClick={() => setFile(null)} fullWidth variant='contained' color='error'>Retake</Button>
                            <Button onClick={onSendClick} fullWidth variant='contained' >Send Video</Button>
                        </Stack>
                    </Stack>
            )}
        </Stack>
    );
}

export default VideoRecord;