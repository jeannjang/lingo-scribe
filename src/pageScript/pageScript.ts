import { waitUntilAsync } from '../helpers';
import {
    AvailableBcp47ListMessage,
    messageType,
    SubtitleFetchError,
    SubtitleRequestMessage,
    SubtitleResponseMessage,
} from '../types/messages';
import spyOnJsonParse from './spyOnJsonParse';
import { getSubtitleDownloadUrls } from './subtitleDownloadUrlsStore';
import parseXmlToSubtitles from './parseXmlToSubtitles';
import spyOnPageUrl from '@/src/pageScript/spyOnPageUrl';

// This code is injected into the page by contentScript.ts,
// and it is executed in the page's context, unlike contentScript.ts and serviceWorker.ts.

interface NetflixTimedTextTrack {
    bcp47: string;
}

interface NetflixVideoPlayer {
    getTimedTextTrackList: () => NetflixTimedTextTrack[];
    setTimedTextTrack: (textTrack: NetflixTimedTextTrack) => void;
}

const getNetflixVideoPlayer = (windowObject: Window & { netflix?: any }) => {
    try {
        const playerAppApi =
            windowObject.netflix.appContext.state.playerApp.getAPI();
        const playerSessionId =
            playerAppApi.videoPlayer.getAllPlayerSessionIds()[0];
        return playerAppApi.videoPlayer.getVideoPlayerBySessionId(
            playerSessionId
        ) as NetflixVideoPlayer;
    } catch (_) {
        return undefined;
    }
};

const getNetflixVideoPlayerAsync = async (
    windowObject: Window & { netflix?: any }
) => {
    await waitUntilAsync(
        () => getNetflixVideoPlayer(windowObject) != undefined,
        50,
        10000
    );
    return getNetflixVideoPlayer(windowObject) as NetflixVideoPlayer;
};

const getTimedTextTrackListAsync = async (videoPlayer: NetflixVideoPlayer) => {
    await waitUntilAsync(() => videoPlayer.getTimedTextTrackList().length > 0);
    return videoPlayer.getTimedTextTrackList();
};

const sendSubtitleFetchErrorMessage = (message: string) => {
    window.postMessage(
        {
            type: 'SUBTITLE/FETCH_ERROR',
            payload: {
                message,
            },
        } satisfies SubtitleFetchError,
        '*'
    );
};

const addSubtitleRequestMessageListener = (
    windowObject: Window,
    netflixVideoPlayer: NetflixVideoPlayer
) => {
    windowObject.onmessage = async (event) => {
        const eventType = event.data.type;
        if (eventType === messageType.subtitleRequest) {
            const {
                payload: { bcp47 },
            } = event.data as SubtitleRequestMessage;

            // Check if subtitleDownloadUrls is already stored.
            // If not, set the target timedTextTrack to netflix video player and wait for the download URLs to be stored.
            // spyOnJsonParse will intercept calls and store the target subtitleDownloadUrls.
            if (!getSubtitleDownloadUrls()[bcp47]) {
                const selectedTimedTextTrack = netflixVideoPlayer
                    .getTimedTextTrackList()
                    .find((textTrack: any) => textTrack.bcp47 === bcp47);

                if (!selectedTimedTextTrack) {
                    sendSubtitleFetchErrorMessage(
                        `Subtitle not found for ${bcp47} in the timed track list`
                    );
                    return;
                }

                netflixVideoPlayer.setTimedTextTrack(selectedTimedTextTrack);

                try {
                    await waitUntilAsync(() => {
                        return getSubtitleDownloadUrls()[bcp47] !== undefined;
                    });

                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (_) {
                    sendSubtitleFetchErrorMessage(
                        `Timeout to intercept subtitle download url for ${bcp47}`
                    );
                    return;
                }
            }

            const urls = getSubtitleDownloadUrls()[bcp47];

            // Fetch the first subtitle download url
            const response = await fetch(urls[0]);

            if (!response.ok) {
                sendSubtitleFetchErrorMessage(
                    `Failed to fetch subtitle for ${bcp47}`
                );
                return;
            }

            const xmlSubtitleString = await response.text();
            const parsedSubtitleLines = parseXmlToSubtitles(xmlSubtitleString);

            window.postMessage(
                {
                    type: 'SUBTITLE/RESPONSE',
                    payload: {
                        bcp47,
                        subtitleLines: parsedSubtitleLines,
                    },
                } satisfies SubtitleResponseMessage,
                '*'
            );
        }
    };
};

const main = async () => {
    spyOnJsonParse(window);
    spyOnPageUrl(window);

    const netflixVideoPlayer = await getNetflixVideoPlayerAsync(window);
    const timedTextTrackList =
        await getTimedTextTrackListAsync(netflixVideoPlayer);

    addSubtitleRequestMessageListener(window, netflixVideoPlayer);

    const bcp47List = timedTextTrackList
        .filter((textTrack: any) => textTrack.bcp47)
        .map((textTrack: any) => textTrack.bcp47);

    window.postMessage(
        {
            type: 'SUBTITLE/AVAILABLE_BCP47_LIST',
            payload: bcp47List,
        } satisfies AvailableBcp47ListMessage,
        '*'
    );
};

main().catch(console.error);
