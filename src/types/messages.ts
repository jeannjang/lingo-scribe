import { Subtitle } from './subtitle';

export interface SubtitleRequestMessage {
    type: 'SUBTITLE_REQUEST';
}

export interface SubtitleResponseMessage {
    type: 'SUBTITLE_RESPONSE';
    payload: SubtitleResponsePayload;
}

interface SubtitleResponsePayload {
    subtitles: Subtitle[];
}
