import { waitUntilAsync } from '../helpers';
import {
    AvailableBcp47ListMessage,
    messageType,
    SubtitleRequestMessage,
    SubtitleResponseMessage,
} from '../types/messages';
import spyOnJsonParse from './spyOnJsonParse';
import { getSubtitleDownloadUrls } from './subtitleDownloadUrlsStore';
import parseXmlToSubtitles from './parseXmlToSubtitles';

// This code is injected into the page by contentScript.ts,
// and it is executed in the page's context, unlike contentScript.ts and serviceWorker.ts.

interface NetflixTimedTextTrack {
    bcp47: string;
}

interface NetflixVideoPlayer {
    getTimedTextTrackList: () => NetflixTimedTextTrack[];
    setTimedTextTrack: (textTrack: NetflixTimedTextTrack) => void;
}

const getNetflixVideoPlayerAsync = async (
    windowObject: Window & { netflix?: any }
) => {
    await waitUntilAsync(() => windowObject.netflix);
    const playerAppApi =
        windowObject.netflix.appContext.state.playerApp.getAPI();
    const playerSessionId =
        playerAppApi.videoPlayer.getAllPlayerSessionIds()[0];
    return playerAppApi.videoPlayer.getVideoPlayerBySessionId(
        playerSessionId
    ) as NetflixVideoPlayer;
};

const getTimedTextTrackListAsync = async (videoPlayer: NetflixVideoPlayer) => {
    await waitUntilAsync(() => videoPlayer.getTimedTextTrackList().length > 0);
    return videoPlayer.getTimedTextTrackList();
};

const main = async () => {
    spyOnJsonParse(window);

    const netflixVideoPlayer = await getNetflixVideoPlayerAsync(window);
    const timedTextTrackList =
        await getTimedTextTrackListAsync(netflixVideoPlayer);

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
