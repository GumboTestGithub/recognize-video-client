const DescriptionContent = ({onCameraClick, onGalleryClick}) => {
    return (
        <>
        <div>여기는 설명입니다.</div>
            <button onClick={onCameraClick}>카메라</button>
            <button onClick={onGalleryClick}>갤러리</button>
        </>
    )

}

export default DescriptionContent;