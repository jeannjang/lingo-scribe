import React, { useEffect } from 'react';
import { Subtitle } from '@/src/types/subtitle';
import { VideoPauseMessage } from '@/src/types/messages';
import useVideoCurrentTime from '@/src/contentScript/component/hooks/useVideoCurrentTime';
import { DeckMode } from '@/src/contentScript/component/components/SubtitleDeck/index';

interface IProps {
    subtitle?: Subtitle;
    isUserAnswerChecking: boolean;
    mode: DeckMode;
}

const SubtitleBar: React.FC<IProps> = ({
    subtitle,
    isUserAnswerChecking,
    mode,
}) => {
    const currentTime = useVideoCurrentTime(100);

    const currentSubtitleLines = currentTime
        ? subtitle?.subtitleLines.filter(
              (line) =>
                  currentTime >= line.beginMs / 1000 &&
                  currentTime <= line.endMs / 1000
          )
        : [];

    useEffect(() => {
        // As this SubtitleBar is rendered every 100ms,
        // we need to check if the current time is within 0.1s of the end of the subtitle line
        if (
            currentTime &&
            currentSubtitleLines?.some(
                (line) => line.endMs / 1000 - currentTime < 0.1
            )
        ) {
            window.postMessage(
                { type: 'VIDEO/PAUSE' } satisfies VideoPauseMessage,
                '*'
            );
        }
    }, [currentTime]);

    return (
        <>
            {currentSubtitleLines?.map((line) => (
                <p
                    className={`text-white text-base md:text-2xl ${
                        mode === 'dictation' && !isUserAnswerChecking
                            ? 'opacity-0'
                            : 'opacity-100'
                    }`}
                >
                    {line.text}
                </p>
            ))}
        </>
    );
};

export default SubtitleBar;
