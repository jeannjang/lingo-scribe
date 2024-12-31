import './component/index.tsx';

// As content script is running in a different context,
// we need to inject the pageScript into the DOM so that it can access the page's context.
window.addEventListener('load', () => {
    const scriptsToInject = ['pageScript.js'];
    scriptsToInject.forEach((scriptName) => {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', chrome.runtime.getURL(scriptName));
        document.head.appendChild(scriptElement);
    });
});

window.onmessage = (event) => {
    switch (event.data.type) {
        case 'SUBTITLE/AVAILABLE_BCP47_LIST': {
            // TODO: This list will be stored in a Redux store later
            console.log('Received message from pageScript ', event.data);
            return;
        }
        case 'SUBTITLE/RESPONSE': {
            // TODO: This list will be stored in a Redux store later
            console.log(
                'Received message from pageScript ',
                event.data.payload
            );
            return;
        }
        case 'SUBTITLE/FETCH_ERROR': {
            // TODO: Will let the user know that the subtitle fetch failed
            console.log('Received message from pageScript ', event.data);
            return;
        }
    }
};
