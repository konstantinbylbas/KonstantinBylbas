/** @format */

import App from '@app/App';
import NotificationContextProvider from '@app/contexts/notificationContext';
import TranslationContextProvider from '@app/contexts/translationContext';
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
