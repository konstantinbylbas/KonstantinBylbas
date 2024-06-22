/** @format */

import { ButtonProps } from '@app/types/button.type';
import './Button.scss';

export default function Button({
    label,
    isDisabled = false,
    handlerClick,
}: ButtonProps) {
    return (
        <button className="button" disabled={isDisabled} onClick={handlerClick}>
            {label}
        </button>
    );
}
