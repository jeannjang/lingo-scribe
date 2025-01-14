import { createReducer } from '@reduxjs/toolkit';
import { Subtitle } from '@/src/types/subtitle';
import * as actions from '../actions';
import { AsyncRequestStatus } from '@/src/types/status';

interface SubtitleSliceState {
    availableLanguagesInBcp47: string[];
    subtitles: {
        study?: Subtitle;
        guide?: Subtitle;
    };
    status: AsyncRequestStatus;
}

const initialState: SubtitleSliceState = {
    availableLanguagesInBcp47: [],
    subtitles: {},
    status: 'idle',
};

const subtitleReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        actions.fetchAvailableLanguagesInBcp47Initialised,
        (state) => {
            state.status = 'loading';
        }
    );
    builder.addCase(
        actions.fetchAvailableLanguagesInBcp47Succeeded,
        (state, action) => {
            state.availableLanguagesInBcp47 = action.payload.bcp47s;
            state.status = 'success';
        }
    );
    builder.addCase(actions.fetchAvailableLanguagesInBcp47Failed, (state) => {
        state.status = 'fail';
    });
    builder.addCase(actions.subtitleCacheReset, (state) => {
        state.subtitles = {};
        state.status = 'idle';
    });

    builder.addCase(actions.fetchSubtitleInitialised, (state) => {
        state.status = 'loading';
    });

    builder.addCase(actions.fetchSubtitleSucceeded, (state, action) => {
        const { type, subtitle } = action.payload;
        state.subtitles[type] = subtitle;
        state.status = 'success';
    });

    builder.addCase(actions.fetchSubtitleFailed, (state) => {
        state.status = 'fail';
    });
});

export default subtitleReducer;
