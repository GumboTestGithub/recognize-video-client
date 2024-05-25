import { FC, useState } from "react";
import Camera from "./Camera/Camera.tsx";
import GalleryContent from "./Gallery/Gallery.tsx";
import Main from "./Main/Main.tsx";

type CurrentContent = "main" | "camera" | "gallery";

const Content: FC = () => {

    const [currentContent, setCurrentContent] = useState<CurrentContent>("main");

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