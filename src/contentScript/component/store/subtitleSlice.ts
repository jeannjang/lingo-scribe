import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subtitle } from '../../../types/subtitle';

interface SubtitleSliceState {
    availableLanguagesInBcp47: string[];
    subtitles: {
        study?: Subtitle;
        guide?: Subtitle;
    };
    isLoading: boolean;
    error?: string;
}

const initialState: SubtitleSliceState = {
    availableLanguagesInBcp47: [],
    subtitles: {},
    isLoading: false,
    error: undefined,
};

const subtitleSlice = createSlice({
    name: 'subtitle',
    initialState,
    reducers: {
        setAvailableLanguages: (
            state,
            action: PayloadAction<{ bcp47: string[] }>
        ) => {
            state.availableLanguagesInBcp47 = action.payload.bcp47; //Store the newly updated bcp47 structure data in state.availableLanguagesInBcp47
        },
        setSubtitle: (
            state,
            action: PayloadAction<{
                type: 'study' | 'guide';
                subtitle: Subtitle;
            }>
        ) => {
            const { type, subtitle } = action.payload;
            state.subtitles[type] = subtitle;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setAvailableLanguages, // Store the list of available subtitle languages provided by Netflix
    setSubtitle, // Store the actual subtitle data
    setLoading,
    setError,
} = subtitleSlice.actions;

export default subtitleSlice.reducer;
