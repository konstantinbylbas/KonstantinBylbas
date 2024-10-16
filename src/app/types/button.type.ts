/** @format */

export interface ButtonProps {
    label: string;
    size?: ButtonSize;
    isDisabled?: boolean;
    handlerClick?: (event: any) => void;
    args?: any[];
}

export enum ButtonSize {
    SMALL = 'size-small',
    FULL = 'size-full',
}
