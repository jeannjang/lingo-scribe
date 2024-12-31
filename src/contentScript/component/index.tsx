import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const REACT_ROOT_ID = 'subtitle-extension-react-root';

let rootElement = document.getElementById(REACT_ROOT_ID);
if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = REACT_ROOT_ID;
    document.body.appendChild(rootElement);
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
