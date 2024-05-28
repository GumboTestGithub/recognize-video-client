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
                    <Button variant='contained' fullWidth onClick={openFilePicker}>Select</Button>
                </>
            ): (
                <Stack gap={2}>
                        <video src={URL.createObjectURL(file)} controls style={{width: '100%'}}/>
                        <Stack flexDirection='row' gap={1} justifyContent='center'>
                            <Button fullWidth variant='contained' color='error' onClick={() => setFile(null)}>Reselect</Button>
                            <Button fullWidth variant='contained' onClick={onSendClick}>Send Video</Button>
                        </Stack>
                    </Stack>
            )}
        </Stack>
    );

}

export default SelectFile;