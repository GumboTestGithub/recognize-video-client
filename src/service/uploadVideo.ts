const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const TEST_MILLI_SECOND = 5000;

export interface ApiResponse {
    videoUrl: string;
    imageUrls: string[];
    audioUrls: string[];
    plateNumbers: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const uploadVideo = async (_file: File): Promise<ApiResponse> => {
    await sleep(TEST_MILLI_SECOND);
    return {
        videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        imageUrls: ["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"],
        audioUrls: ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"],
        plateNumbers: ["1234", "5678"]
    }
};