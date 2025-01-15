import React, { useEffect, useState } from 'react';
import { Subtitle } from '@/src/types/subtitle';

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

    const subtitleLines = subtitle?.subtitleLines.filter(
        (line) =>
            currentTime >= line.beginMs / 1000 &&
            currentTime <= line.endMs / 1000
    );

    return (
        <>
            {subtitleLines?.map((line) => (
                <h2 className={'text-white text-xl'}>{line.text}</h2>
            ))}
        </>
    );
};

export default SubtitleBar;
