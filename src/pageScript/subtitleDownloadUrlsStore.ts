// The key of the object is the language code (bcp47), and the value is an array of URLs.
export interface SubtitleDownloadUrls {
    [key: string]: string[];
}

// The subtitleDownloadUrls object stores the subtitle URLs for various languages.
const subtitleDownloadUrls: SubtitleDownloadUrls = {};

// The getSubtitleDownloadUrls function returns a deep copy of the subtitleDownloadUrls object to ensure immutability.
export const getSubtitleDownloadUrls = () => {
    // return deep copy of subtitleDownloadUrls
    return Object.entries(subtitleDownloadUrls).reduce((acc, [bcp47, urls]) => {
        acc[bcp47] = [...urls];
        return acc;
    }, {} as SubtitleDownloadUrls);
};

// The addSubtitleDownloadUrls function updates the subtitleDownloadUrls object with new subtitle URLs for specific languages,
// provided the new URLs array is not empty.
export const addSubtitleDownloadUrls = (
    newSubtitleDownloadUrls: SubtitleDownloadUrls
) => {
    Object.entries(newSubtitleDownloadUrls).forEach(([bcp47, urls]) => {
        if (urls.length > 0) {
            subtitleDownloadUrls[bcp47] = urls;
        }
    });
};
