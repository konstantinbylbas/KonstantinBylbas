/** @format */

import App from '@app/App';
import NotificationContextProvider from '@app/contexts/notificationContext';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <NotificationContextProvider>
        <App />
    </NotificationContextProvider>,
);
