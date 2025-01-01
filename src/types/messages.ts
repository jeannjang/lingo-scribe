import { Subtitle } from './subtitle';
import { UserPreferences } from './userPreferences';

export const messageType = {
    availableBcp47List: 'SUBTITLE/AVAILABLE_BCP47_LIST',
    subtitleRequest: 'SUBTITLE/REQUEST',
    subtitleResponse: 'SUBTITLE/RESPONSE',
    subtitleFetchError: 'SUBTITLE/FETCH_ERROR',
    getUserPreferences: 'USER_PREFERENCES/GET',
    setUserPreferences: 'USER_PREFERENCES/SET',
} as const;

type MessageBase = {
    type: (typeof messageType)[keyof typeof messageType];
};

export interface AvailableBcp47ListMessage extends MessageBase {
    type: 'SUBTITLE/AVAILABLE_BCP47_LIST';
    payload: string[];
}

export interface SubtitleRequestMessage extends MessageBase {
    type: 'SUBTITLE/REQUEST';
    payload: {
        bcp47: string;
    };
}

export interface SubtitleResponseMessage extends MessageBase {
    type: 'SUBTITLE/RESPONSE';
    payload: Subtitle;
}

export interface SubtitleFetchError extends MessageBase {
    type: 'SUBTITLE/FETCH_ERROR';
    payload: {
        message: string;
    };
}

export interface GetUserPreferencesRequest extends MessageBase {
    type: 'USER_PREFERENCES/GET';
}

export type GetUserPreferencesResponse = UserPreferences;

export interface SetUserPreferences extends MessageBase {
    type: 'USER_PREFERENCES/SET';
    payload: {
        userPreferences: UserPreferences;
    };
}
