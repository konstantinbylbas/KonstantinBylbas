/** @format */

import { ButtonProps } from '@app/types/button.type';
import './Button.scss';

export default function Button({
    label,
    size,
    isDisabled = false,
    handlerClick,
    ...args
}: ButtonProps) {
    return (
        <div className={`button hoverable ${size ? size : ''}`} {...args}>
            <button disabled={isDisabled} onClick={handlerClick}>
                {label}
            </button>

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
