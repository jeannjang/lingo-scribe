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
