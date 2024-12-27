import { Subtitle } from '../types/subtitle';
import {
    SubtitleRequestMessage,
    SubtitleResponseMessage,
} from '../types/messages';

const requestSubtitles = async (): Promise<Subtitle[]> => {
    const response = await chrome.runtime.sendMessage<
        SubtitleRequestMessage,
        SubtitleResponseMessage
    >({
        type: 'SUBTITLE_REQUEST',
    });

    console.log('Received subtitle data:', response);

    return response.payload.subtitles;
};

const main = async () => {
    console.log('Content Script loaded');
    const subtitles = await requestSubtitles();
    console.log(subtitles);
    // Render subtitles on the page
};

main().catch((error) => {
    console.log(error);
});
