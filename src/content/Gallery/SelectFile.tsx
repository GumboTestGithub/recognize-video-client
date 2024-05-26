import { FC, useRef, useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  sendVideo: () => void;
}

const SelectFile: FC<Props> = ({sendVideo}) => {
    const [videoURL, setVideoURL] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoURL(url);
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button onClick={openFilePicker}>갤러리에서 동영상 가져오기</Button>
            {videoURL && (
                <div>
                    <h3>선택한 동영상</h3>
                    <video src={videoURL} controls style={{ width: '100%' }} />
                    <Button onClick={sendVideo}>Send Video</Button>
                </div>
            )}
        </div>
    );

}

export default SelectFile;