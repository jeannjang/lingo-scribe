import { createAction } from '@reduxjs/toolkit';
import { Subtitle } from '@/src/types/subtitle';

const PREFIX = 'SUBTITLE';

export const availableLanguagesInBcp47Set = createAction<{ bcp47: string[] }>(
    `${PREFIX}/AVAILABLE_BCP47_SET`
);

export const subtitleSet = createAction<{
    type: 'study' | 'guide';
    subtitle: Subtitle;
}>(`${PREFIX}/SUBTITLE_SET`);
