import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DeckMode } from '@/src/contentScript/component/components/SubtitleDeck/index';

interface IProps {
    mode: DeckMode;
    setDeckModeChange: (mode: DeckMode) => void;
}

const DeckModeSwitch: React.FC<IProps> = ({ mode, setDeckModeChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <p className={'text-white text-sm font-medium'}>Dual Sub</p>
            <Switch
                id="dictation-mode"
                checked={mode === 'dictation'}
                onCheckedChange={(checked) =>
                    setDeckModeChange(checked ? 'dictation' : 'dualSub')
                }
            />
            <Label htmlFor="dictation-mode" className={'text-white'}>
                Dictation
            </Label>
        </div>
    );
};

export default DeckModeSwitch;
