import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './Index.css';

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
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
