/** @format */

import { iNotification } from '@app/types/notification.type';
import './Notifications.scss';
import ReactDOM from 'react-dom';
import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '@app/contexts/notificationContext';

export default function Notifications() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [portal, setPortal] = useState<HTMLDivElement | undefined>(undefined);
    const [notifications, setNotifications] = useState<iNotification[]>([]);

    const notificationsMaxNumber = 3;
    const expirationTime = 3;

    useEffect(() => {
        if (contextNotification.length) {
            const newNotifications = contextNotification.slice(
                0,
                notificationsMaxNumber,
            );

            if (!portal) {
                const newPortal = document.createElement('div');
                newPortal.classList.add('notifications');
                setPortal(newPortal);
                document.body.appendChild(newPortal);
            }

            const uniqueNotifications = newNotifications.filter(
                newNotification => !notifications.includes(newNotification),
            );

            uniqueNotifications.forEach(notificationWithoutTimeout => {
                setTimeout(() => {
                    setContextNotification(prevContextNotification =>
                        prevContextNotification.filter(
                            notification =>
                                notification !== notificationWithoutTimeout,
                        ),
                    );
                }, expirationTime * 1000);
            });

            setNotifications(newNotifications);
        } else if (portal) {
            document.body.removeChild(portal);
            setPortal(undefined);
        }
    }, [contextNotification]);

    if (!portal) return null;

    return ReactDOM.createPortal(
        <>
            {contextNotification
                .slice(0, notificationsMaxNumber)
                .map((notification, i) => (
                    <div
                        className={`notifications_message ${notification}`}
                        key={`message #${i}`}>
                        {notification.message}
                    </div>
                ))}
        </>,
        portal,
    );
}
