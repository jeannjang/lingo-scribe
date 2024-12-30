# LingoScribe: Language Learning Chrome Extension

## Overview

LingoScribe transforms video streaming platforms like Netflix into interactive language learning environments. By leveraging existing subtitles, users can practice dictation and improve their language skills while enjoying their favorite content.

## Technical Architecture

### Subtitle Processing Approaches

We evaluated three potential approaches for handling subtitles:

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
- More extensive initial development effort

#### Approach 2: DOM-based Subtitle Tracking

This approach involves real-time tracking of subtitle elements in the DOM.

**Advantages:**
- Real-time subtitle synchronization
- Immediate startup without loading delay
  - avoids the initial waiting time needed for parsing subtitle files from network responses that Approach 1 requires

**Challenges:**
- Less precise timing information
- High DOM structure dependency making the system vulnerable to platform UI changes and requiring frequent maintenance
- Reduced efficiency from constant DOM operations

#### Approach 3: JSON Parse Interception with Page Script Injection

This approach involves intercepting Netflix's JSON responses by injecting a custom script directly into the page context.

**Implementation Strategy:**
1. Content Script injects a Page Script into the DOM
2. Page Script intercepts window.JSON.parse
3. Page Script monitors and captures subtitle-related JSON responses
4. Page Script extracts subtitle URLs and metadata from intercepted responses

**Technical Details:**
- Content Script and Page Script run in different contexts:
  - Content Script: Isolated context with limited access to page's window object
  - Page Script: Runs in page's context with full access to Netflix's JavaScript environment
  - Both can access the DOM

**Advantages:**
- Direct access to Netflix's internal data flow
- No DOM structure dependency
- More reliable than DOM observation
- Captures subtitle URLs as soon as they're received
- Access to complete subtitle metadata
- Can intercept and process all available languages simultaneously

**Challenges:**
- Requires careful script injection timing
- More complex implementation than DOM-based approaches
- Needs to handle different JSON response formats
- Requires maintenance if Netflix changes their response structure
- Proper isolation between different execution contexts

### Implementation Decision

After careful evaluation of all three approaches, we have chosen to implement Approach 3 using JSON Parse Interception. This decision is based on several key advantages. First, it provides superior multilingual support with better handling of multiple language subtitles and more efficient language switching capabilities, which is essential for our future language learning features. The approach also offers enhanced reliability and performance.
From a resource perspective, it offers more efficient handling of subtitle data and better memory management.
While we acknowledge that this approach requires a more complex initial implementation, it provides the most robust foundation among the three approaches for our language learning features and future development plans.