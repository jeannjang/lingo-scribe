import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import {
    GetUserPreferencesRequest,
    GetUserPreferencesResponse,
} from '@/src/types/messages';
import {
    fetchUserPreferencesFailed,
    fetchUserPreferencesSucceeded,
} from '../actions';

export const fetchUserPreferencesSaga = function* () {
    yield takeLatest(actions.fetchUserPreferencesInitialised, function* () {
        try {
            const userPreferences: GetUserPreferencesResponse = yield call<
                (
                    message: GetUserPreferencesRequest
                ) => Promise<GetUserPreferencesResponse>
            >(chrome.runtime.sendMessage, {
                type: 'USER_PREFERENCES/GET',
            });
            yield put(fetchUserPreferencesSucceeded(userPreferences));
        } catch (error: any) {
            console.error(error);
            yield put(fetchUserPreferencesFailed());
        }
    });
};
