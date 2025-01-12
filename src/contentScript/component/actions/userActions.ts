import { createAction } from '@reduxjs/toolkit';
import { UserPreferences } from '@/src/types/userPreferences';

const PREFIX = 'USER/';

export const userPreferencesSet = createAction<UserPreferences>(
    `${PREFIX}/PREFERENCES_SET`
);

export const fetchUserPreferencesInitialised = createAction(
    `${PREFIX}/FETCH_PREFERENCES_INITIALISED`
);

export const fetchUserPreferencesSucceeded = createAction<UserPreferences>(
    `${PREFIX}/FETCH_PREFERENCES_SUCCEEDED`
);

export const fetchUserPreferencesFailed = createAction(
    `${PREFIX}/FETCH_PREFERENCES_FAILED`
);
