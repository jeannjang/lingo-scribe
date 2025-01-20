import React, { useEffect, useState } from 'react';
import { Subtitle } from '@/src/types/subtitle';
import { VideoPauseMessage } from '@/src/types/messages';

interface IProps {
    subtitle?: Subtitle;
}
const SubtitleBar: React.FC<IProps> = ({ subtitle }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        console.debug(subtitle);

        const updateTime = () => {
            const videoElement = document.querySelector('video');
            if (!videoElement) return;
            setCurrentTime(videoElement.currentTime);
        };

        const intervalId = setInterval(updateTime, 100); // Update every 100ms

        // Clean up the interval on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const currentSubtitleLines = subtitle?.subtitleLines.filter(
        (line) =>
            currentTime >= line.beginMs / 1000 &&
            currentTime <= line.endMs / 1000
    );

    if (
        // As this SubtitleBar is rendered every 100ms,
        // we need to check if the current time is within 0.1s of the end of the subtitle line
        currentSubtitleLines?.some(
            (line) => line.endMs / 1000 - currentTime < 0.1
        )
    ) {
        window.postMessage(
            { type: 'VIDEO/PAUSE' } satisfies VideoPauseMessage,
            '*'
        );
    }

    return (
        <>
            {currentSubtitleLines?.map((line) => (
                <h2 className={'text-white text-xl'}>{line.text}</h2>
            ))}
        </>
    );
};

export default SubtitleBar;
