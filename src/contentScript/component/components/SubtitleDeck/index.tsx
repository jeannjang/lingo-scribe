import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/contentScript/component/store/store';
import SubtitleBar from '@/src/contentScript/component/components/SubtitleDeck/SubtitleBar';
import DictationTextInput from '@/src/contentScript/component/components/SubtitleDeck/DictationTextInput';
import DeckModeSwitch from '@/src/contentScript/component/components/SubtitleDeck/DeckModeSwitch';
export type DeckMode = 'dictation' | 'dualSub';
const SubtitleDeck = () => {
    const subtitles = useSelector(
        (state: RootState) => state.subtitle.subtitles
    );
    const [isUserAnswerChecking, setIsUserAnswerChecking] = useState(false);
    const [mode, setMode] = useState<DeckMode>('dictation');

    console.log('All subtitles:', subtitles);

    return (
        <>
            <div
                className={
                    'absolute bottom-44 w-full flex flex-col items-center justify-center space-y-1.5 pointer-events-auto'
                }
            >
                {subtitles.study && (
                    <SubtitleBar
                        subtitle={subtitles.study}
                        isUserAnswerChecking={isUserAnswerChecking}
                        mode={mode}
                    />
                )}
                {subtitles.guide && (
                    <SubtitleBar
                        subtitle={subtitles.guide}
                        isUserAnswerChecking={isUserAnswerChecking}
                        mode={mode}
                    />
                )}

                {mode === 'dictation' && (
                    //Control video playback based on the study subtitle timestamps.
                    <DictationTextInput
                        subtitle={subtitles.study}
                        setIsUserAnswerChecking={setIsUserAnswerChecking}
                    />
                )}

                <DeckModeSwitch mode={mode} setModeChange={setMode} />
            </div>
        </>
    );
};

export default SubtitleDeck;
