import React, { ChangeEvent, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { VideoPlayMessage, VideoSeekMsMessage } from '@/src/types/messages';
import { Button } from '@/components/ui/button';
import useVideoCurrentTime from '@/src/contentScript/component/hooks/useVideoCurrentTime';
import { Subtitle, SubtitleLine } from '@/src/types/subtitle';

type SeekLineType = 'previous' | 'next' | 'replay';

interface IProps {
    subtitle?: Subtitle;
    setIsUserAnswerChecking: (check: boolean) => void;
}
const DictationTextInput = ({ subtitle, setIsUserAnswerChecking }: IProps) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const previousIndexRef = useRef<number>(-1);
    const currentTime = useVideoCurrentTime();

    const findCurrentIndex = (
        subtitleLines: SubtitleLine[] | undefined,
        currentTime: number | undefined
    ) => {
        if (!subtitleLines || currentTime === undefined) return -1;
        console.log('Not founded subtitle or currentTime');

        return subtitleLines.findIndex(
            (line) =>
                currentTime >= line.beginMs / 1000 &&
                currentTime <= line.endMs / 1000
        );
    };

    // Centralized state update logic when currentIndex is different from previousIndex
    const currentIndex = findCurrentIndex(subtitle?.subtitleLines, currentTime);
    if (currentIndex !== previousIndexRef.current) {
        setIsUserAnswerChecking(false); // hide subtitleLine (opacity-0 in SubtitleBar.tsx)
        setInputValue(''); // clear up input value
        inputRef.current?.focus(); // stay in focus with onClick event
        previousIndexRef.current = currentIndex; // Update state of currentIndex into previouseIndexRef.current
    }

    const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheck = () => {
        setIsUserAnswerChecking(true);
        inputRef.current?.focus();
    };

    const handlePlay = () => {
        window.postMessage(
            { type: 'VIDEO/PLAY' } satisfies VideoPlayMessage,
            '*'
        );
    };

    const findSubtitleLine = (
        type: SeekLineType,
        subtitleLines: SubtitleLine[],
        currentTime: number
    ) => {
        if (currentIndex === -1) {
            const prevLineIndex = subtitleLines.findLastIndex(
                (line) => line.beginMs / 1000 < currentTime
            );
            const nextLineIndex = prevLineIndex + 1;
            console.log(
                'prevLineIndex:',
                prevLineIndex,
                'nextLineIndex:',
                nextLineIndex
            );

            switch (type) {
                case 'previous':
                    return subtitleLines[prevLineIndex] || null;
                case 'next':
                    return subtitleLines[nextLineIndex] || null;
                case 'replay':
                    return null;
            }
        }

        switch (type) {
            case 'previous':
                return currentIndex > 0
                    ? subtitleLines[currentIndex - 1]
                    : null;
            case 'next':
                return currentIndex < subtitleLines.length - 1
                    ? subtitleLines[currentIndex + 1]
                    : null;
            case 'replay':
                return currentIndex !== -1 ? subtitleLines[currentIndex] : null;
        }
    };

    const handleSeek = (type: SeekLineType) => () => {
        if (subtitle?.subtitleLines && currentTime) {
            const foundLine = findSubtitleLine(
                type,
                subtitle.subtitleLines,
                currentTime
            );

            if (foundLine !== null) {
                window.postMessage(
                    {
                        type: 'VIDEO/SEEK_MS',
                        payload: {
                            seekMs: foundLine.beginMs,
                        },
                    } satisfies VideoSeekMsMessage,
                    '*'
                );
                console.log('Post message of seekLine:');

                {
                    window.postMessage(
                        {
                            type: 'VIDEO/PLAY',
                        } satisfies VideoPlayMessage,
                        '*'
                    );
                }

                if (type === 'replay') {
                    setIsUserAnswerChecking(false);
                    inputRef.current?.focus();
                }
            }
        }
    };

    return (
        <div className="w-full max-w-3xl flex items-center gap-2 px-4">
            <Button
                variant="outline"
                onClick={handleSeek('previous')}
                className="w-[40px]"
            >
                Prev
            </Button>
            <Input
                onBlur={(e) => {
                    // Netflix player will steal focus when they hide the video controller panel
                    // This will prevent the player from stealing focus
                    if (
                        e.relatedTarget?.getAttribute('data-uia') === 'player'
                    ) {
                        e.target.focus();
                    }
                }}
                ref={inputRef}
                autoFocus={true}
                value={inputValue}
                onChange={onHandleChange}
                placeholder="Type the subtitle here..."
                className="text-white md:text-lg h-10"
            />
            <Button
                variant="outline"
                onClick={handleSeek('next')}
                className="w-[40px]"
            >
                Next
            </Button>
            <Button
                variant="outline"
                onClick={handleSeek('replay')}
                className="w-[40px]"
            >
                Replay
            </Button>
            <Button
                variant="outline"
                onClick={handleCheck}
                className="w-[40px]"
            >
                Check
            </Button>
            <Button variant="outline" onClick={handlePlay} className="w-[40px]">
                Play
            </Button>
        </div>
    );
};

export default DictationTextInput;
