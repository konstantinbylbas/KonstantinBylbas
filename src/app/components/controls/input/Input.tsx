/** @format */

import { InputProps } from '@app/types/input.type';
import './Input.scss';

export default function Input({
    isReadOnly,
    placeholder,
    value,
    onFocus,
}: InputProps) {
    function handlerFocus(): void {
        if (onFocus) {
            onFocus();
        }
    }

    return (
        <div className="input hoverable">
            <input
                readOnly={isReadOnly}
                type="text"
                placeholder={placeholder}
                defaultValue={value}
                onFocus={handlerFocus}
            />

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
