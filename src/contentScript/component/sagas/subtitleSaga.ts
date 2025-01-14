import { all, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import {
    AvailableBcp47ListRequestMessage,
    AvailableBcp47ListResponseMessage,
    SubtitleRequestMessage,
    SubtitleResponseMessage,
} from '@/src/types/messages';

function* fetchAvailableLanguagesInBcp47Saga() {
    yield takeLatest(
        actions.fetchAvailableLanguagesInBcp47Initialised,
        function* () {
            try {
                window.postMessage(
                    {
                        type: 'SUBTITLE/AVAILABLE_BCP47_LIST_REQUEST',
                    } satisfies AvailableBcp47ListRequestMessage,
                    '*'
                );

                const response: AvailableBcp47ListResponseMessage =
                    yield new Promise((resolve) => {
                        const messageHandler = (event: MessageEvent) => {
                            if (
                                event.data.type ===
                                'SUBTITLE/AVAILABLE_BCP47_LIST_RESPONSE'
                            ) {
                                window.removeEventListener(
                                    'message',
                                    messageHandler
                                );
                                resolve(event.data);
                            }
                        };
                        window.addEventListener('message', messageHandler);
                    });

                yield put(
                    actions.fetchAvailableLanguagesInBcp47Succeeded({
                        bcp47s: response.payload,
                    })
                );
            } catch (error: any) {
                console.error(error);
                yield put(
                    actions.fetchAvailableLanguagesInBcp47Failed({
                        message: error.message || 'Unknown error',
                    })
                );
            }
        }
    );
}

function* fetchSubtitleSaga() {
    yield takeLatest(actions.fetchSubtitleInitialised, function* (action) {
        try {
            // Send subtitle request message to page script
            window.postMessage(
                {
                    type: 'SUBTITLE/REQUEST',
                    payload: {
                        bcp47: action.payload.bcp47,
                    },
                } satisfies SubtitleRequestMessage,
                '*'
            );

            // Wait for response
            const response: SubtitleResponseMessage = yield new Promise(
                (resolve, reject) => {
                    const messageHandler = (event: MessageEvent) => {
                        if (event.data.type === 'SUBTITLE/RESPONSE') {
                            window.removeEventListener(
                                'message',
                                messageHandler
                            );
                            resolve(event.data);
                        } else if (event.data.type === 'SUBTITLE/FETCH_ERROR') {
                            reject(event.data.payload.message);
                        }
                    };
                    window.addEventListener('message', messageHandler);
                }
            );

            // Update state on success
            yield put(
                actions.fetchSubtitleSucceeded({
                    type: action.payload.type,
                    subtitle: response.payload,
                })
            );
        } catch (error: any) {
            console.error(error);
            yield put(
                actions.fetchSubtitleFailed({
                    type: action.payload.type,
                    error: error.message || 'Unknown error',
                })
            );
        }
    });
}

export function* subtitleSaga() {
    yield all([fetchAvailableLanguagesInBcp47Saga(), fetchSubtitleSaga()]);
}
