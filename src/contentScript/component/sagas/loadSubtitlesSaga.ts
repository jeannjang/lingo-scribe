import { all, put, takeLatest, take, select, race } from 'redux-saga/effects';
import * as actions from '../actions';
import { RootState } from '@/src/contentScript/component/store/store';
import { UserSliceState } from '@/src/contentScript/component/store/userReducer';

const initialSubtitlesSetupSaga = function* () {
    yield takeLatest(actions.isWindowOnPlayerPageSet, function* (action) {
        // If the window is not on the player page, return
        if (!action.payload.isWindowOnPlayerPage) {
            return;
        }

        // Reset the subtitles state
        yield put(actions.subtitleCacheReset());

        // Request the available subtitles
        yield put(actions.fetchAvailableLanguagesInBcp47Initialised());

        // Wait for the available subtitles to be fetched
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _, fetchAvailableLanguagesInBcp47Failed } = yield race({
            fetchAvailableLanguagesInBcp47Succeeded: take(
                actions.fetchAvailableLanguagesInBcp47Succeeded
            ),
            fetchAvailableLanguagesInBcp47Failed: take(
                actions.fetchAvailableLanguagesInBcp47Failed
            ),
        });

        console.debug(
            'Initial Subtitles Setup Saga - Available Languages Fetched'
        );

        if (fetchAvailableLanguagesInBcp47Failed) {
            console.debug('Failed to fetch available languages');
            const failedAction =
                fetchAvailableLanguagesInBcp47Failed as ReturnType<
                    typeof actions.fetchAvailableLanguagesInBcp47Failed
                >;
            console.error(failedAction.payload.message);
            return;
        }

        // Check if user preferences are set
        const userState: UserSliceState = yield select(
            (state: RootState) => state.user
        );

        console.debug('User State:', userState);

        let studyLanguage: string | undefined =
            userState.preferences?.studyLanguage;
        let guideLanguage: string | undefined =
            userState.preferences?.guideLanguage;

        // If user preferences are failed, return
        if (userState.status === 'fail') {
            return;
        }

        // Wait for user preferences to be fetched
        if (userState.status === 'idle' || userState.status === 'loading') {
            if (userState.status === 'idle') {
                yield put(actions.fetchUserPreferencesInitialised());
            }
            const {
                fetchUserPreferencesSucceeded,
                fetchUserPreferencesFailed,
            } = yield race({
                fetchUserPreferencesSucceeded: take(
                    actions.fetchUserPreferencesSucceeded
                ),
                fetchUserPreferencesFailed: take(
                    actions.fetchUserPreferencesFailed
                ),
            });
            if (fetchUserPreferencesFailed) {
                return;
            } else {
                const fetchUserPreferencesSucceededAction =
                    fetchUserPreferencesSucceeded as ReturnType<
                        typeof actions.fetchUserPreferencesSucceeded
                    >;
                studyLanguage =
                    fetchUserPreferencesSucceededAction.payload.studyLanguage;
                guideLanguage =
                    fetchUserPreferencesSucceededAction.payload.guideLanguage;
            }
        }

        console.debug(
            'Initial Subtitles Setup Saga - studyLanguage:',
            studyLanguage
        );

        // If study language is undefined, wait for user preferences to be set
        if (!userState.preferences?.studyLanguage) {
            const userPreferencesSetAction: ReturnType<
                typeof actions.userPreferencesSet
            > = yield take(actions.userPreferencesSet);
            studyLanguage = userPreferencesSetAction.payload.studyLanguage;
        }

        // If study language is still undefined, return
        if (!studyLanguage) {
            return;
        }

        console.debug(
            'Initial Subtitles Setup Saga - User Preferences Fetched'
        );

        // Fetch study subtitles
        const availableLanguagesInBcp47: string[] = yield select(
            (state: RootState) => state.subtitle.availableLanguagesInBcp47
        );

        console.debug('Available Languages:', availableLanguagesInBcp47);

        if (availableLanguagesInBcp47.includes(studyLanguage)) {
            yield put(
                actions.fetchSubtitleInitialised({
                    type: 'study',
                    bcp47: studyLanguage,
                })
            );

            console.debug(
                'Initial Subtitles Setup Saga - Fetching Study Subtitles'
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _, fetchStudySubtitleFailed } = yield race({
                fetchStudySubtitleSucceeded: take(
                    actions.fetchSubtitleSucceeded
                ),
                fetchStudySubtitleFailed: take(actions.fetchSubtitleFailed),
            });

            if (fetchStudySubtitleFailed) {
                console.debug('Failed to fetch study subtitles');
                const fetchStudySubtitleFailedAction =
                    fetchStudySubtitleFailed as ReturnType<
                        typeof actions.fetchSubtitleFailed
                    >;
                console.error(fetchStudySubtitleFailedAction.payload.error);
                return;
            }
        }

        // Fetch guide subtitles
        if (
            guideLanguage &&
            availableLanguagesInBcp47.includes(guideLanguage)
        ) {
            yield put(
                actions.fetchSubtitleInitialised({
                    type: 'guide',
                    bcp47: guideLanguage as string,
                })
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _, fetchGuideSubtitleFailed } = yield race({
                fetchGuideSubtitleSucceeded: take(
                    actions.fetchSubtitleSucceeded
                ),
                fetchGuideSubtitleFailed: take(actions.fetchSubtitleFailed),
            });
            if (fetchGuideSubtitleFailed) {
                console.debug('Failed to fetch guide subtitles');
                const fetchGuideSubtitleFailedAction =
                    fetchGuideSubtitleFailed as ReturnType<
                        typeof actions.fetchSubtitleFailed
                    >;
                console.error(fetchGuideSubtitleFailedAction.payload.error);
            }
        }
    });
};

export function* loadSubtitlesSaga() {
    yield all([initialSubtitlesSetupSaga()]);
}
