# LingoScribe: Language Learning Chrome Extension

## Overview

LingoScribe transforms video streaming platforms like Netflix into interactive language learning environments. By leveraging existing subtitles, users can practice dictation and improve their language skills while enjoying their favorite content.

## Technical Architecture

### Subtitle Processing Approaches

We evaluated two potential approaches for handling subtitles:

#### Approach 1: Service Worker Subtitle Interception

The extension uses a Service Worker to intercept and process subtitle files directly from the streaming service's response.

**Advantages:**
- High accuracy subtitle data through direct XML parsing
- Efficient performance with one-time parsing and caching
- Stable codebase with minimal maintenance requirements
- Reliable timing information for subtitle synchronization

**Challenges:**
- Initial processing may introduce slight latency
- Careful consideration needed for copyright compliance
- Network dependency for initial subtitle file retrieval
- More extensive initial development effort (while offering better stability, needs more sophisticated code logic for file parsing, caching, and timing management than Approach 2's simpler DOM-based implementation)

#### Approach 2: DOM-based Subtitle Tracking

This approach involves real-time tracking of subtitle elements in the DOM.

**Advantages:**
- Real-time subtitle synchronization
- Immediate startup without loading delay
  - avoids the initial waiting time needed for parsing subtitle files from network responses that Approach 1 requires

**Challenges:**
- Less precise timing information
- High DOM structure dependency making the system vulnerable to platform UI changes and requiring frequent maintenance
  - subtitle text extraction, previous/next subtitle tracking, and timing all rely on specific UI element structures
- Reduced efficiency from constant DOM operations:
  - Continuous subtitle element monitoring requires:
    - Frequent DOM traversal for subtitle visibility checks
    - Regular content update detection
    - Constant timing synchronization with video playback

### Implementation Decision

We've chosen to implement **Approach 1** using Service Worker subtitle interception for the following reasons:

1. **Superior Performance**: One-time parsing and caching provide better overall performance compared to continuous DOM operations.
2. **Maintenance Efficiency**: More stable codebase with fewer dependencies on UI structure changes.
3. **Data Accuracy**: Direct access to subtitle files ensures precise timing and text information.
4. **Resource Optimization**: Reduced processing overhead after initial subtitle parsing.

While there are initial concerns about potential latency, this approach provides a more reliable and efficient solution for our language learning features. The slight loading delay, in the beginning, is a reasonable trade-off for the improved accuracy and stability of the extension.