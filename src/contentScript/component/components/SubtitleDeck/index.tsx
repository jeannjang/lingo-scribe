import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/contentScript/component/store/store';
import SubtitleBar from '@/src/contentScript/component/components/SubtitleDeck/SubtitleBar';
import DictationTextInput from '@/src/contentScript/component/components/SubtitleDeck/DictationTextInput';

const SubtitleDeck = () => {
    const subtitles = useSelector(
        (state: RootState) => state.subtitle.subtitles
    );
    const preferences = useSelector(
        (state: RootState) => state.user.preferences
    );
    const [isUserAnswerChecking, setIsUserAnswerChecking] = useState(false);

    console.log('All subtitles:', subtitles);

    if (!preferences) return null;

    return (
        <>
            <div
                className={
                    'absolute bottom-44 w-full flex flex-col items-center justify-center space-y-2 pointer-events-auto'
                }
            >
                {subtitles.study && (
                    <SubtitleBar
                        subtitle={subtitles.study}
                        isUserAnswerChecking={isUserAnswerChecking}
                        deckMode={preferences.deckMode}
                        subType="study"
                        isAutoPause={preferences.isAutoPause}
                    />
                )}

                {subtitles.guide && (
                    <SubtitleBar
                        subtitle={subtitles.guide}
                        isUserAnswerChecking={isUserAnswerChecking}
                        deckMode={preferences.deckMode}
                        subType="guide"
                        isAutoPause={preferences.isAutoPause}
                    />
                )}
                {preferences.deckMode === 'dictation' && (
                    //Control video playback based on the study subtitle timestamps.
                    <DictationTextInput
                        subtitle={subtitles.study}
                        setIsUserAnswerChecking={setIsUserAnswerChecking}
                    />
                )}
            </div>
        </>
    );
};

export default SubtitleDeck;
