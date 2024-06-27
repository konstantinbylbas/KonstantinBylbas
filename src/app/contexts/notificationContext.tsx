/** @format */

import React, { useState } from 'react';
import { iNotification } from '../types/notification.type';

interface NotificationContextType {
    contextNotification: iNotification[];
    setContextNotification: React.Dispatch<
        React.SetStateAction<iNotification[]>
    >;
}

interface NotificationContextProviderProps {
    children: React.ReactNode;
}

export const NotificationContext = React.createContext<NotificationContextType>(
    {
        contextNotification: [],
        setContextNotification: () => {},
    },
);

export default function NotificationContextProvider({
    children,
}: NotificationContextProviderProps) {
    const [contextNotification, setContextNotification] = useState<
        iNotification[]
    >([]);

    return (
        <NotificationContext.Provider
            value={{
                contextNotification,
                setContextNotification,
            }}>
            {children}
        </NotificationContext.Provider>
    );
}
