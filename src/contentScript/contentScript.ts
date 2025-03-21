import { messageType, UserPreferencesUpdated } from '@/src/types/messages';
import { store } from '@/src/contentScript/component/store/store';
import { renderReactApp } from '@/src/contentScript/component';
import {
    isWindowOnPlayerPageSet,
    userPreferencesSet,
} from '@/src/contentScript/component/actions';

console.log('ContentScript is loaded');

// As content script is running in a different context,
// we need to inject the pageScript into the DOM so that it can access the page's context.
window.addEventListener('load', () => {
    const scriptsToInject = ['pageScript.js'];
    scriptsToInject.forEach((scriptName) => {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', chrome.runtime.getURL(scriptName));
        document.head.appendChild(scriptElement);
    });
});

window.onmessage = (event) => {
    switch (event.data.type) {
        case messageType.pageScriptIsReady: {
            renderReactApp();
            return;
        }
        case messageType.windowOnPlayerPage: {
            store.dispatch(
                isWindowOnPlayerPageSet({
                    isWindowOnPlayerPage: event.data.payload,
                })
            );
            return;
        }
        case messageType.subtitleFetchError: {
            console.log('Subtitle Fetch Error:', event.data.payload.message);
            return;
        }
    }
};

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === messageType.userPreferencesUpdated) {
        // Reload the page if the user's language preferences have changed so that the page can be re-rendered with the new language.
        if (
            store.getState().user.preferences?.studyLanguage !==
                (message as UserPreferencesUpdated).payload.userPreferences
                    .studyLanguage ||
            store.getState().user.preferences?.guideLanguage !==
                (message as UserPreferencesUpdated).payload.userPreferences
                    .guideLanguage
        ) {
            location.reload();
        }

        store.dispatch(
            userPreferencesSet(
                (message as UserPreferencesUpdated).payload.userPreferences
            )
        );
    }
});
