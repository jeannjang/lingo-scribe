import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { BCP47_LANGUAGES } from '@/src/constants/languagesList';

interface ComboBoxProps {
    value: string | undefined;
    onSelect: (value: string) => void;
}
const ComboBox = ({ value, onSelect }: ComboBoxProps) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const selectedLanguage = BCP47_LANGUAGES.find(
        (language) => language.bcp47 === value
    );

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-muted-foreground"
                >
                    {selectedLanguage
                        ? selectedLanguage.displayName
                        : 'Select language...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-77 p-0">
                <Command>
                    <CommandInput
                        placeholder="Search language..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList className="max-h-[250px]">
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {BCP47_LANGUAGES.map((language) => (
                                <CommandItem
                                    key={language.bcp47}
                                    value={language.displayName}
                                    onSelect={() => {
                                        onSelect(language.bcp47);
                                        setOpen(false);
                                        setSearchValue('');
                                    }}
                                >
                                    {language.displayName}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ComboBox;
