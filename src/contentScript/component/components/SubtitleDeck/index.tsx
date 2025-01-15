import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/contentScript/component/store/store';
import SubtitleBar from '@/src/contentScript/component/components/SubtitleDeck/SubtitleBar';

const SubtitleDeck = () => {
    const subtitles = useSelector(
        (state: RootState) => state.subtitle.subtitles
    );

    return (
        <div className={'w-full py-1 h-10'}>
            <SubtitleBar subtitle={subtitles.study} />
            <SubtitleBar subtitle={subtitles.guide} />
        </div>
    );
};

export default SubtitleDeck;
