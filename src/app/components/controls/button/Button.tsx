/** @format */

import { ButtonProps } from '@app/types/button.type';
import './Button.scss';

export default function Button({
    label,
    isDisabled = false,
    handlerClick,
}: ButtonProps) {
    return (
        <div className="button hoverable">
            <button disabled={isDisabled} onClick={handlerClick}>
                {label}
            </button>

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
