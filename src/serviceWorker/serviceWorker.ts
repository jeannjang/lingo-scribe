import { SubtitleResponseMessage } from '../types/messages';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Service Worker installed');
});

chrome.runtime.onMessage.addListener(
    (
        message,
        _,
        sendResponse: (responseMessages: SubtitleResponseMessage) => void
    ) => {
        console.log(
            'Service Worker received message from Content Script:',
            message
        );

        if (message.type === 'SUBTITLE_REQUEST') {
            console.log('Processing subtitle request...');
            const mockSubtitleData = {
                subtitles: [
                    { startTime: 0, endTime: 5000, text: 'Test subtitle 1' },
                    {
                        startTime: 5000,
                        endTime: 10000,
                        text: 'Test subtitle 2',
                    },
                ],
            };

            sendResponse({
                type: 'SUBTITLE_RESPONSE',
                payload: mockSubtitleData,
            });
        }

        return true;
    }
);
