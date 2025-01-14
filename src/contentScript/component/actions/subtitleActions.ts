import { createAction } from '@reduxjs/toolkit';
import { Subtitle } from '@/src/types/subtitle';

const PREFIX = 'SUBTITLE';

export const subtitleCacheReset = createAction(`${PREFIX}/CACHE_RESET`);

export const fetchAvailableLanguagesInBcp47Initialised = createAction(
    `${PREFIX}/FETCH_AVAILABLE_LANGUAGES_IN_BCP47_INITIALISED`
);

export const fetchAvailableLanguagesInBcp47Succeeded = createAction<{
    bcp47s: string[];
}>(`${PREFIX}/FETCH_AVAILABLE_LANGUAGES_IN_BCP47_SUCCEEDED`);

export const fetchAvailableLanguagesInBcp47Failed = createAction<{
    message: string;
}>(`${PREFIX}/FETCH_AVAILABLE_LANGUAGES_IN_BCP47_FAILED`);

export const fetchSubtitleInitialised = createAction<{
    type: 'study' | 'guide';
    bcp47: string;
}>(`${PREFIX}/FETCH_SUBTITLE_INITIALISED`);

export const fetchSubtitleSucceeded = createAction<{
    type: 'study' | 'guide';
    subtitle: Subtitle;
}>(`${PREFIX}/FETCH_SUBTITLE_SUCCEEDED`);

export const fetchSubtitleFailed = createAction<{
    type: 'study' | 'guide';
    error: string;
}>(`${PREFIX}/FETCH_SUBTITLE_FAILED`);
