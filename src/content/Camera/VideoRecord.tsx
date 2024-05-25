import { FC, useRef, useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  sendVideo: () => void;
}

const VideoRecord: FC<Props> = ({sendVideo}) => {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const videoRef = useRef(null);
    const recordedChunks = useRef([]);


    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: 'video/webm',
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(recordedChunks.current, {
                type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            setVideoURL(url);
            recordedChunks.current = [];
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setRecording(false);
    };


    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{ width: '100%' }} />
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