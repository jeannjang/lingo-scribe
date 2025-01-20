import { useEffect, useRef, useState } from 'react';

// This hook will return the current time of the video element.
// It will update every `refreshRateMs` milliseconds. The default is 100ms.
const useVideoCurrentTime = (refreshRateMs = 100) => {
    const [currentTime, setCurrentTime] = useState<number | undefined>(
        undefined
    );
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const updateTime = () => {
        // Cache video element reference
        if (!videoRef.current) {
            videoRef.current = document.querySelector('video');
        }

        const videoElement = videoRef.current;
        if (!videoElement) return;

        const newTime = videoElement.currentTime;

        // Use setState with callback to access latest currentTime
        setCurrentTime((prevTime) => {
            // Initialize time if undefined
            if (prevTime === undefined) {
                return newTime;
            }

            // Only update if the time difference exceeds threshold
            if (Math.abs(newTime - prevTime) >= refreshRateMs / 1000) {
                return newTime;
            }

            return prevTime;
        });
    };

    useEffect(() => {
        const intervalId = setInterval(updateTime, refreshRateMs);
        return () => clearInterval(intervalId);
    }, [updateTime]);

    return currentTime;
};

export default useVideoCurrentTime;
