import { WindowOnPlayerPage } from '@/src/types/messages';
import { resetSubtitleDownloadUrls } from '@/src/pageScript/subtitleDownloadUrlsStore';

export const determineIfWindowOnPlayerPage = (url: string | URL) =>
    typeof url === 'string'
        ? url.includes('/watch/')
        : url.href.includes('/watch/');

const handleUrl = (url: string | URL | null | undefined) => {
    if (url) {
        resetSubtitleDownloadUrls();

        window.postMessage({
            type: 'APP/WINDOW_ON_PLAYER_PAGE',
            payload: determineIfWindowOnPlayerPage(url),
        } satisfies WindowOnPlayerPage);
    }
};
const spyOnPageUrl = (windowObject: Window) => {
    // addEventListener on popState
    windowObject.addEventListener('popstate', () => {
        const currentUrl = windowObject.location.href;
        handleUrl(currentUrl);
    });

    // Spy pushState
    const originalPushState = windowObject.history.pushState;

    windowObject.history.pushState = (
        ...args: Parameters<typeof originalPushState>
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, __, url] = args;
        handleUrl(url);
        return originalPushState.apply(windowObject.history, args);
    };

    // Spy replaceState
    const originalReplaceState = windowObject.history.replaceState;

    windowObject.history.replaceState = (
        ...args: Parameters<typeof originalReplaceState>
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, __, url] = args;
        handleUrl(url);
        return originalReplaceState.apply(windowObject.history, args);
    };
};

export default spyOnPageUrl;
