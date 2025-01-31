import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/contentScript/component/store/store';
import SubtitleBar from '@/src/contentScript/component/components/SubtitleDeck/SubtitleBar';
import DictationTextInput from '@/src/contentScript/component/components/SubtitleDeck/DictationTextInput';

const SubtitleDeck = () => {
    const subtitles = useSelector(
        (state: RootState) => state.subtitle.subtitles
    );
    const [isUserAnswerChecking, setIsUserAnswerChecking] = useState(false);

    console.log('All subtitles:', subtitles);

    return (
        <>
            <div
                className={
                    'absolute bottom-44 w-full flex flex-col items-center justify-center space-y-2 pointer-events-auto'
                }
            >
                {subtitles.study ? (
                    <SubtitleBar
                        subtitle={subtitles.study}
                        isUserAnswerChecking={isUserAnswerChecking}
                    />
                ) : null}
                {/*<SubtitleBar subtitle={subtitles.guide}/>*/}
                <DictationTextInput
                    subtitle={subtitles.study}
                    setIsUserAnswerChecking={setIsUserAnswerChecking}
                />
            </div>
        </>
    );
};

export default SubtitleDeck;
