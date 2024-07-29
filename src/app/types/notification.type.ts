/** @format */

export enum NotificationType {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface iNotification {
    type: NotificationType;
    message: string;
}
