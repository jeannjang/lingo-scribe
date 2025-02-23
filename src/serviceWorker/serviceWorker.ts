import {
    GetUserPreferencesResponse,
    isSetUserPreferencesMessage,
    messageType,
    UserPreferencesUpdated,
} from '../types/messages';
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
    if (isSetUserPreferencesMessage(message)) {
        setUserPreferences(message.payload.userPreferences).then(() => {
            // Send message to Popup.ts
            chrome.runtime.sendMessage<UserPreferencesUpdated>({
                type: messageType.userPreferencesUpdated,
                payload: {
                    userPreferences: message.payload.userPreferences,
                },
            });

            // Send message to contentscripts
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    if (tab.id) {
                        chrome.tabs.sendMessage(tab.id, {
                            type: messageType.userPreferencesUpdated,
                            payload: {
                                userPreferences:
                                    message.payload.userPreferences,
                            },
                        });
                    }
                });
            });
        });

        // Return false to indicate that we will call sendResponse synchronously
        return false;
    }
});
