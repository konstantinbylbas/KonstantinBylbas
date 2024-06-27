/** @format */

export enum NotificationType {
    INFO,
    SUCCESS,
    WARNING,
    ERROR,
}

export interface iNotification {
    type: NotificationType;
    message: string;
}
