import { language } from '../types/language';
export const BCP47_LANGUAGES: language[] = [
    // Major Languages
    { bcp47: 'en', displayName: 'English' },
    // Spanish variants
    { bcp47: 'es', displayName: 'Spanish' },
    // French
    { bcp47: 'fr', displayName: 'French' },
    { bcp47: 'de', displayName: 'German' },
    { bcp47: 'it', displayName: 'Italian' },
    // Portuguese variants
    { bcp47: 'pt', displayName: 'Portuguese' },
    { bcp47: 'ru', displayName: 'Russian' },
    { bcp47: 'ja', displayName: 'Japanese' },
    { bcp47: 'ko', displayName: 'Korean' },
    // Chinese variants
    // { bcp47: 'zh', displayName: 'Chinese' },
    { bcp47: 'zh-Hans', displayName: 'Chinese (Simplified)' },
    { bcp47: 'zh-Hant', displayName: 'Chinese (Traditional)' },

    // Other Common Languages
    { bcp47: 'ar', displayName: 'Arabic' },
    { bcp47: 'hi', displayName: 'Hindi' },
    { bcp47: 'bn', displayName: 'Bengali' },
    { bcp47: 'id', displayName: 'Indonesian' },
    { bcp47: 'ms', displayName: 'Malay' },
    { bcp47: 'th', displayName: 'Thai' },
    { bcp47: 'tr', displayName: 'Turkish' },
    { bcp47: 'vi', displayName: 'Vietnamese' },
    { bcp47: 'nl', displayName: 'Dutch' },
    { bcp47: 'pl', displayName: 'Polish' },

    // European Languages
    { bcp47: 'cs', displayName: 'Czech' },
    { bcp47: 'da', displayName: 'Danish' },
    { bcp47: 'el', displayName: 'Greek' },
    { bcp47: 'fi', displayName: 'Finnish' },
    { bcp47: 'hu', displayName: 'Hungarian' },
    { bcp47: 'no', displayName: 'Norwegian' },
    { bcp47: 'ro', displayName: 'Romanian' },
    { bcp47: 'sk', displayName: 'Slovak' },
    { bcp47: 'sv', displayName: 'Swedish' },
    { bcp47: 'uk', displayName: 'Ukrainian' },

    // Asian Languages
    { bcp47: 'fa', displayName: 'Persian' },
    { bcp47: 'he', displayName: 'Hebrew' },
    { bcp47: 'km', displayName: 'Khmer' },
    { bcp47: 'lo', displayName: 'Lao' },
    { bcp47: 'my', displayName: 'Burmese' },
    { bcp47: 'ne', displayName: 'Nepali' },
    { bcp47: 'si', displayName: 'Sinhala' },
    { bcp47: 'tl', displayName: 'Tagalog' },
    { bcp47: 'ur', displayName: 'Urdu' },

    // etc...in get timed text list
    { bcp47: 'gl', displayName: 'Galician' },
    { bcp47: 'nb', displayName: 'Norwegian Bokmål' },
    { bcp47: 'ca', displayName: 'Catalan' },
    { bcp47: 'hr', displayName: 'Croatian' },
    { bcp47: 'eu', displayName: 'Basque' },
    { bcp47: 'fil', displayName: 'Filipino' },
];
