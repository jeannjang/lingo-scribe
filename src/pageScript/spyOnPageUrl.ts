import { WindowOnPlayerPage } from '@/src/types/messages';

export const determineIfWindowOnPlayerPage = (url: string | URL) =>
    typeof url === 'string'
        ? url.includes('/watch/')
        : url.href.includes('/watch/');

const sendWindowOnPlayerPageMessage = (
    url: string | URL | null | undefined
) => {
    if (url) {
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
        sendWindowOnPlayerPageMessage(currentUrl);
    });

    // Spy pushState
    const originalPushState = windowObject.history.pushState;

    windowObject.history.pushState = (
        ...args: Parameters<typeof originalPushState>
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, __, url] = args;
        sendWindowOnPlayerPageMessage(url);
        return originalPushState.apply(windowObject.history, args);
    };

    // Spy replaceState
    const originalReplaceState = windowObject.history.replaceState;

    windowObject.history.replaceState = (
        ...args: Parameters<typeof originalReplaceState>
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, __, url] = args;
        sendWindowOnPlayerPageMessage(url);
        return originalReplaceState.apply(windowObject.history, args);
    };
};

export default spyOnPageUrl;
