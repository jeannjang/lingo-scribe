import { createReducer } from '@reduxjs/toolkit';
import { Subtitle } from '@/src/types/subtitle';
import * as actions from '../actions';

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

const subtitleReducer = createReducer(initialState, (builder) => {
    builder.addCase(actions.availableLanguagesInBcp47Set, (state, action) => {
        state.availableLanguagesInBcp47 = action.payload.bcp47;
    });
    builder.addCase(actions.subtitleSet, (state, action) => {
        const { type, subtitle } = action.payload;
        state.subtitles[type] = subtitle;
    });
});

export default subtitleReducer;
