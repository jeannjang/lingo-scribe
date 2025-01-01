import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assertExhaustive } from '../../../helpers';

interface UserSliceState {
    studyLanguage: {
        bcp47?: string;
    };
    guideLanguage: {
        bcp47?: string;
    };
}

const initialState: UserSliceState = {
    studyLanguage: {
        bcp47: undefined,
    },
    guideLanguage: {
        bcp47: undefined,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLanguage: (
            state,
            action: PayloadAction<{ type: 'study' | 'guide'; bcp47: string }>
        ) => {
            const { type, bcp47 } = action.payload;

            switch (type) {
                case 'study':
                    state.studyLanguage.bcp47 = bcp47;
                    return;
                case 'guide':
                    state.guideLanguage.bcp47 = bcp47;
                    return;
                default:
                    assertExhaustive(type);
            }
        },
    },
});

export const { setUserLanguage } = userSlice.actions;
export default userSlice.reducer;
