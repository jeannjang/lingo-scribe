import { Subtitle } from './subtitle';

export const messageType = {
    availableBcp47List: 'SUBTITLE/AVAILABLE_BCP47_LIST',
    subtitleRequest: 'SUBTITLE/REQUEST',
    subtitleResponse: 'SUBTITLE/RESPONSE',
} as const;

type MessageBase = {
    type: (typeof messageType)[keyof typeof messageType];
};

export interface AvailableBcp47ListMessage extends MessageBase {
    type: 'SUBTITLE/AVAILABLE_BCP47_LIST';
    payload: string[];
}

export interface SubtitleResponseMessage {
    type: 'SUBTITLE_RESPONSE';
    payload: SubtitleResponsePayload;
}

interface SubtitleResponsePayload {
    subtitles: Subtitle[];
}
