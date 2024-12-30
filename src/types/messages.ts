import { Subtitle } from './subtitle';

export const messageType = {
    availableBcp47List: 'SUBTITLE/AVAILABLE_BCP47_LIST',
    subtitleRequest: 'SUBTITLE/REQUEST',
    subtitleResponse: 'SUBTITLE/RESPONSE',
    subtitleFetchError: 'SUBTITLE/FETCH_ERROR',
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
    payload: Subtitle[];
}

export interface SubtitleFetchError extends MessageBase {
    type: 'SUBTITLE/FETCH_ERROR';
    payload: {
        message: string;
    };
}
