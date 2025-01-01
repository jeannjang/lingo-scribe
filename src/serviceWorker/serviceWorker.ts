import { GetUserPreferencesResponse, messageType } from '../types/messages';
import { getUserPreferences, setUserPreferences } from './indexedDbOperations';

console.log('Service worker is running');

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === messageType.getUserPreferences) {
        getUserPreferences().then((userPreferences) =>
            sendResponse(userPreferences satisfies GetUserPreferencesResponse)
        );
        // Return true to indicate that we will call sendResponse asynchronously
        return true;
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === messageType.setUserPreferences) {
        setUserPreferences(message.payload.userPreferences);
        // Return false to indicate that we will call sendResponse synchronously
        return false;
    }
});
