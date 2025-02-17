import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/src/contentScript/component/Index.css';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('popup-controller') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
