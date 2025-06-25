/** @format */

import App from './App';
import NotificationContextProvider from './contexts/notificationContext';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <Provider store={store}>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </Provider>,
);
