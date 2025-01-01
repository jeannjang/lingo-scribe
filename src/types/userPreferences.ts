interface UserPreferencesV1 {
    version: 1;
    isAppEnabled: boolean;
    studyLanguage: string | undefined;
    guideLanguage: string | undefined;
}

export type UserPreferences = UserPreferencesV1;
