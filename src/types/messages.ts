import { Subtitle } from './subtitle';
import { UserPreferences } from './userPreferences';

export const messageType = {
    pageScriptIsReady: 'APP/PAGE_SCRIPT_IS_READY',
    windowOnPlayerPage: 'APP/WINDOW_ON_PLAYER_PAGE',
    availableBcp47ListRequest: 'SUBTITLE/AVAILABLE_BCP47_LIST_REQUEST',
    availableBcp47ListResponse: 'SUBTITLE/AVAILABLE_BCP47_LIST_RESPONSE',
    subtitleRequest: 'SUBTITLE/REQUEST',
    subtitleResponse: 'SUBTITLE/RESPONSE',
    subtitleFetchError: 'SUBTITLE/FETCH_ERROR',
    getUserPreferences: 'USER_PREFERENCES/GET',
    setUserPreferences: 'USER_PREFERENCES/SET',
    userPreferencesUpdated: 'USER_PREFERENCES/UPDATED',
    videoPause: 'VIDEO/PAUSE',
    videoPlay: 'VIDEO/PLAY',
    videoSeekMs: 'VIDEO/SEEK_MS',
} as const;

type MessageBase = {
    type: (typeof messageType)[keyof typeof messageType];
};

export interface PageScriptIsReadyMessage extends MessageBase {
    type: 'APP/PAGE_SCRIPT_IS_READY';
}

export interface WindowOnPlayerPage extends MessageBase {
    type: 'APP/WINDOW_ON_PLAYER_PAGE';
    payload: boolean;
}

export interface AvailableBcp47ListRequestMessage extends MessageBase {
    type: 'SUBTITLE/AVAILABLE_BCP47_LIST_REQUEST';
}

export interface AvailableBcp47ListResponseMessage extends MessageBase {
    type: 'SUBTITLE/AVAILABLE_BCP47_LIST_RESPONSE';
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

// Type guard to ensures that the object has a 'type' field matching 'USER_PREFERENCES/SET'
// and a 'payload' containing 'userPreferences'.
export const isSetUserPreferencesMessage = (
    object: any
): object is SetUserPreferences => {
    return (
        Object.hasOwn(object, 'type') &&
        object.type === messageType.setUserPreferences &&
        Object.hasOwn(object, 'payload') &&
        Object.hasOwn(object.payload, 'userPreferences')
    );
};

export interface UserPreferencesUpdated extends MessageBase {
    type: 'USER_PREFERENCES/UPDATED';
    payload: {
        userPreferences: UserPreferences;
    };
}
export interface VideoPauseMessage extends MessageBase {
    type: 'VIDEO/PAUSE';
}

export interface VideoPlayMessage extends MessageBase {
    type: 'VIDEO/PLAY';
}

export interface VideoSeekMsMessage extends MessageBase {
    type: 'VIDEO/SEEK_MS';
    payload: {
        seekMs: number;
    };
}
