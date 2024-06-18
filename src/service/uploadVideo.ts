import axios from "axios";

export interface ApiResponse {
  uuid: string;
  faces: Record<string, string>;
  license_plates: Record<string, string>;
  voices: Record<string, string>;
}

export interface UploadVideoResult {
    uuid: string;
    faces: {
      index: number;
      url: string;
    }[],
    licensePlates: {
        index: number;
        url: string;
    }[]
    voices: {
        index: number;
        url: string;
    }[]
}


export const uploadVideo = async (file: File): Promise<UploadVideoResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data} = await axios.post<ApiResponse>("https://identity-safe.site/api/video", formData, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data",
        },
    })

    //
    // const data = {
    //     faces: {
    //         1: "https://identity-safe.site/api/files/c29aa769-d32d-4734-964f-53fbd325c7fa.jpg",
    //         2: "https://identity-safe.site/api/files/d6686c2c-fa9e-4216-9f96-fb13ece8e396.jpg",
    //         3: "https://identity-safe.site/api/files/ca622c6f-4880-4cd7-9b2c-d1e256b64deb.jpg",
    //         4: "https://identity-safe.site/api/files/8604c53c-4ba2-462f-95dc-fc02049ef781.jpg"
    //     },
    //     license_plates: {
    //         1: "https://identity-safe.site/api/files/5717757f-6f16-4710-9064-6c61f558092d.jpg",
    //         5: "https://identity-safe.site/api/files/0f74c350-919e-46cf-b7b4-4b5ce395a764.jpg"
    //     },
    //     uuid: "cbfe2406-632e-4de5-aa0d-f2b205fbdd21",
    //     voices: {
    //         0: "https://identity-safe.site/api/files/5cfe917c-4ad7-47d4-9a0d-a67b0bef86db.wav",
    //         1: "https://identity-safe.site/api/files/c890c438-6c1d-4e88-9c8a-84f701013177.wav"
    //     }
    // }

    const { uuid, faces, license_plates, voices } = data;

    return {
        uuid: uuid,
        faces: Object.keys(faces).map((index) => ({index: parseInt(index), url: faces[index]})),
        licensePlates: Object.keys(license_plates).map((index) => ({index: parseInt(index), url: license_plates[index]})),
        voices: Object.keys(voices).map((index) => ({index: parseInt(index), url: voices[index]}))
    }
};

export const calculateUploadTime = (file: File):number => {
    console.log(file.size);
    // TODO: 나중에 파일 크기에 맞춰 시간 넣어줘야함
    return 5 * 60 * 1000;
}