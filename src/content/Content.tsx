import { FC } from "react";
import Camera from "./Camera/Camera.tsx";
import GalleryContent from "./Gallery/Gallery.tsx";
import Main from "./Main/Main.tsx";

export type CurrentContent = "main" | "camera" | "gallery";

interface Props {
    currentContent: CurrentContent;
    setCurrentContent: (content: CurrentContent) => void;
}

const Content: FC<Props> = ({currentContent, setCurrentContent}) => {


    if(currentContent === "main") {
        return <Main onCameraClick={() => setCurrentContent('camera')} onGalleryClick={() => setCurrentContent('gallery')} />;
    }

    if(currentContent === "camera") {
        return <Camera />;
    }

    if(currentContent === "gallery") {
        return <GalleryContent />;
    }
}

export default Content;