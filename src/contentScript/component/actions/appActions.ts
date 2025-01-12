import { createAction } from '@reduxjs/toolkit';

const PREFIX = 'APP';

export const isWindowOnPlayerPageSet = createAction<{
    isWindowOnPlayerPage: boolean;
}>(`${PREFIX}/IS_WINDOW_ON_PLAYER_PAGE_SET`);
