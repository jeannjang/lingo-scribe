interface UserPreferencesV1 {
    version: 1;
    isAppEnabled: boolean;
    // The BCP 47 language tag of the language the user is studying.
    studyLanguage: string | undefined;
    // The BCP 47 language tag of the language the user wants to see the guide in.
    guideLanguage: string | undefined;
}

export type UserPreferences = UserPreferencesV1;
