import { DBSchema, openDB } from 'idb';
import { UserPreferences } from '../types/userPreferences';

const DB_VERSION = 1;
const DB_NAME = 'lingoScribeDB';
const USER_PREFERENCE_STORE_NAME = 'userPreference';
const DEFAULT_USER_PREFERENCE_KEY = 'defaultUserPreference';

interface LingoScribeDB extends DBSchema {
    [USER_PREFERENCE_STORE_NAME]: {
        // Only one key-value pair is stored in this store.
        key: typeof DEFAULT_USER_PREFERENCE_KEY;
        value: UserPreferences;
    };
}

const defaultUserPreference: UserPreferences = {
    version: 1,
    appEnabled: true,
    studyLanguage: undefined,
    guideLanguage: undefined,
};

const openLingoScribeDB = async () => {
    return await openDB<LingoScribeDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(USER_PREFERENCE_STORE_NAME)) {
                // We don't use keyPath and autoIncrement here.
                // We will specify the key in the add, get and put method.
                db.createObjectStore(USER_PREFERENCE_STORE_NAME);
            }
        },
    });
};

export const getUserPreferences = async () => {
    const db = await openLingoScribeDB();

    const result = await db.get(
        USER_PREFERENCE_STORE_NAME,
        DEFAULT_USER_PREFERENCE_KEY
    );

    if (!result) {
        await db.put(
            USER_PREFERENCE_STORE_NAME,
            defaultUserPreference,
            DEFAULT_USER_PREFERENCE_KEY
        );

        return defaultUserPreference;
    }

    return result;
};

export const setUserPreferences = async (userPreferences: UserPreferences) => {
    const db = await openLingoScribeDB();

    await db.put(
        USER_PREFERENCE_STORE_NAME,
        userPreferences,
        DEFAULT_USER_PREFERENCE_KEY
    );
};
