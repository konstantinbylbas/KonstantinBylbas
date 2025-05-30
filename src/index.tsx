/** @format */

import App from './App';
import NotificationContextProvider from './contexts/notificationContext';
import TranslationContextProvider from './contexts/translationContext';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <NotificationContextProvider>
        <TranslationContextProvider>
            <App />
        </TranslationContextProvider>
    </NotificationContextProvider>,
);
