import { FC, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  onSendClick: () => void;
}

const SelectFile: FC<Props> = ({file, setFile, onSendClick}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(URL.createObjectURL(file));
            }
        };
    }, [file]);

    return (
        <Stack sx={{width: '100%', height: '100%', p: 2}} justifyContent='center' alignItems='center' gap={5}>
            {!file ? (
                <>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <Button variant='contained' fullWidth onClick={openFilePicker}>선택</Button>
                </>
            ): (
                <Stack gap={2}>
                        <video controls style={{width: 'auto', height: '30vh'}}>
                            <source key={Date.now()} src={URL.createObjectURL(file)}></source>
                        </video>
                        <Stack gap={1} justifyContent='center'>
                            <Button fullWidth variant='contained' color='error' onClick={() => setFile(null)}>재선택</Button>
                            <Button fullWidth variant='contained' onClick={onSendClick}>전송</Button>
                        </Stack>
                    </Stack>
            )}
        </Stack>
    );

}

export default SelectFile;