import {Container} from "./layout/Container.jsx";
import {Header} from "./layout/Header.jsx";
import {Content} from "./layout/Content.jsx";
import DescriptionContent from "./content/description/DescriptionContent.jsx";
import GalleryContent from "./content/gallery/GalleryContent.jsx";
import CameraContent from "./content/camera/CameraContent.jsx";
import {useState} from "react";

const App = () => {

  const [selectedContent, setSelectedContent] = useState(undefined);

  const handleCameraClick = () => {
    setSelectedContent('camera');
  }

  const handleGalleryClick = () => {
    setSelectedContent('gallery');
  }

  return (
      <Container>
        <Header></Header>
        <Content>
          {selectedContent === undefined && (
              <DescriptionContent
                onCameraClick={handleCameraClick}
                onGalleryClick={handleGalleryClick}
              />
          )}
          {selectedContent === 'gallery' && <GalleryContent/>}
          {selectedContent === 'camera' && <CameraContent/>}
        </Content>
      </Container>
  )
}

export default App