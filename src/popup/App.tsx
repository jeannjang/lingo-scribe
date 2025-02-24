import React, { useEffect, useState } from 'react';
import PopupCard from '@/src/popup/PopupCard';
import { UserPreferences } from '@/src/types/userPreferences';
import {
    GetUserPreferencesRequest,
    GetUserPreferencesResponse,
    messageType,
    UserPreferencesUpdated,
} from '@/src/types/messages';

// Manage user preference state and state updates
// Inside useEffect, send a message to the service worker and update the state with the response
// Pass the state (value) as a prop to PopupCard
const App = () => {
    const [userPreferences, setUserPreferences] = useState<
        UserPreferences | undefined
    >(undefined);

    // On initial render, send a message to retrieve stored preferences
    useEffect(() => {
        chrome.runtime
            .sendMessage<GetUserPreferencesRequest, GetUserPreferencesResponse>(
                {
                    type: messageType.getUserPreferences,
                }
            )
            .then((userPreferencesResponse) => {
                setUserPreferences(userPreferencesResponse);
            });
    }, []);

    // The service worker triggers the setUserPreferences() function in IndexedDB
    // and stores the preferences, and sends back a response
    // App.tsx update PopupCard with the received message
    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === messageType.userPreferencesUpdated) {
                setUserPreferences(
                    (message as UserPreferencesUpdated).payload.userPreferences
                );
            }
        });
    }, []);

    return <PopupCard userPreferences={userPreferences} />;
};

export default App;
