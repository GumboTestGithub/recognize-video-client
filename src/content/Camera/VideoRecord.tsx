import { FC, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  sendVideo: () => void;
}

const VideoRecord: FC<Props> = ({ sendVideo }) => {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const mediaRecorderRef = useRef<{ recorder?: MediaRecorder }>({});
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const recordedChunks = useRef<Blob[]>([]);
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
                    canvasRef.current!.width = video.videoWidth;
                    canvasRef.current!.height = video.videoHeight;

                    const drawFrame = () => {
                        if (ctx) {
                            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                            animationFrameId = requestAnimationFrame(drawFrame);
                        }
                    };
                    drawFrame();
                };
            }
        };

        if (recording) {
            drawCanvas();
        } else {
            cancelAnimationFrame(animationFrameId);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [recording]);

    const startRecording = async () => {
        if (canvasRef.current) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });
                console.log(navigator.mediaDevices)
                streamRef.current = stream;
                let options
                console.log(MediaRecorder)
                if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                    options = {mimeType: 'video/webm; codecs=vp9'};
                } else  if (MediaRecorder.isTypeSupported('video/webm')) {
                    options = {mimeType: 'video/webm'};
                } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                    options = {mimeType: 'video/mp4', videoBitsPerSecond : 100000};
                } else {
                    console.error("no suitable mimetype found for this device");
                }
                mediaRecorderRef.current.recorder = new MediaRecorder(stream, options);

                mediaRecorderRef.current.recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        recordedChunks.current.push(event.data);
                    }
                };

                mediaRecorderRef.current.recorder.onstop = () => {
                    const blob = new Blob(recordedChunks.current, {
                        type: 'video/webm',
                    });
                    const url = URL.createObjectURL(blob);
                    setVideoURL(url);
                    recordedChunks.current = [];
                };

                mediaRecorderRef.current.recorder.start();
                setRecording(true);
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current.recorder && streamRef.current) {
            mediaRecorderRef.current.recorder.stop();
            streamRef.current.getTracks().forEach(track => track.stop());
            setRecording(false);
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} style={{ width: '100%' }} />
            <div>
                {recording ? (
                    <Button onClick={stopRecording}>녹화 완료</Button>
                ) : (
                    <Button onClick={startRecording}>녹화 시작</Button>
                )}
            </div>
            {videoURL && (
                <div>
                    <h3>저장된 화면</h3>
                    <video src={videoURL} controls style={{ width: '100%' }} />
                    <Button onClick={sendVideo}>Send Video</Button>
                </div>
            )}
        </div>
    );
}

export default VideoRecord;
