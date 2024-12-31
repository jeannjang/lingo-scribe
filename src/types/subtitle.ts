export interface SubtitleLine {
    beginMs: number;
    endMs: number;
    text: string;
}

export interface Subtitle {
    bcp47: string;
    subtitleLines: SubtitleLine[];
}
