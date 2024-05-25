import { FC } from "react";
import ContentWrapper from "../ContentWrapper.tsx";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import Stack from "@mui/material/Stack";

interface Props {
  onCameraClick: () => void;
  onGalleryClick: () => void;
}

const Main: FC<Props> = ({onCameraClick, onGalleryClick}) => {
    return <ContentWrapper>
        <Box sx={{
            flexGrow: 1,
            boxSizing: 'border-box',
            padding: '24px',
            
        }}>
            <Typography variant='body1'>
                소개글~~~~`
                아이덴티티세이프는 어떤 서비스를 제공하고
                어쩌구 저쩌구

                서비스 목표
                무분별한 개인정보 노출을 막고 안전한 디지털사회 어쩌구
                ~~~~~~~~~

                활용방안
                틱톡이나 유튜브 영상 촬영에 쓸 수 있고
                어쩌구
                ~~~~~~``
                인지소 누구누구 제작.
            </Typography>
        </Box>
        <Stack sx={{width: '100%', height: '300px', padding: '24px', boxSizing:'border-box', alignItems: 'center'}} gap={2}>
            <Box>
                <Typography variant='h6'>개인정보비식별화 대상을 선택하세요</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
                <Button variant='contained' sx={{width: '100px', height: '100px'}} onClick={onCameraClick}>
                    <CameraEnhanceRoundedIcon fontSize='large' />
                </Button>
                <Button variant='contained' sx={{width: '100px', height: '100px'}} onClick={onGalleryClick}>
                    <CollectionsRoundedIcon fontSize='large' />
                </Button>
            </Box>
        </Stack>
    </ContentWrapper>
}

export default Main;