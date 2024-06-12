import axios from "axios";

export interface DeidentificationRequest {
  faces: number[];
  license_plates: number[];
  uuid: string;
  voices: number[];
}

export interface DeidentifitcationResponse {
    url: string
}

export const deidentification = async (request: DeidentificationRequest): Promise<string> => {
    const {data} = await axios.post<DeidentifitcationResponse>("https://is.taewonkim.store/api/de-identification", request, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
        },
    })

    return data.url
};
