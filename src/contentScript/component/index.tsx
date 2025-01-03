import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider} from '@mui/material/styles';
import './global.css';
import theme from './theme/theme';

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
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <div className="overlay-container">
                    <App />
                </div>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
