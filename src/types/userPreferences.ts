interface UserPreferencesV1 {
    version: 1;
    isAppEnabled: boolean;
    // The BCP 47 language tag of the language the user is studying. : use in comboBox
    studyLanguage: string | undefined;
    // The BCP 47 language tag of the language the user wants to see the guide in : use in comboBox
    guideLanguage: string | undefined;
    deckMode: DeckMode;
    isAutoPause: boolean;
}

export type DeckMode = 'dictation' | 'dualSub';

export type UserPreferences = UserPreferencesV1;
