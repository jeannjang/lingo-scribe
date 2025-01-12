import { messageType } from '@/src/types/messages';
import { store } from '@/src/contentScript/component/store/store';
import { renderReactApp } from '@/src/contentScript/component';
import { isWindowOnPlayerPageSet } from '@/src/contentScript/component/actions';

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
        case messageType.availableBcp47ListResponse: {
            // TODO: This list will be stored in a Redux store later
            console.log('Received message from pageScript ', event.data);
            return;
        }
        case messageType.subtitleResponse: {
            // TODO: This list will be stored in a Redux store later
            console.log(
                'Received message from pageScript ',
                event.data.payload
            );
            return;
        }
        case messageType.subtitleFetchError: {
            // TODO: Will let the user know that the subtitle fetch failed
            console.log('Received message from pageScript ', event.data);
            return;
        }
    }
};
