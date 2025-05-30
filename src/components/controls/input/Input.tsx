/** @format */

import { InputProps } from '@_types/input.type';
import './Input.scss';

export function Input({
    name,
    isReadOnly,
    placeholder,
    value,
    onChange,
    onFocus,
}: InputProps) {
    function handlerChange(event: any): void {
        if (onChange) {
            onChange(event);
        }
    }

    function handlerFocus(): void {
        if (onFocus) {
            onFocus();
        }
    }

    return (
        <div className="input hoverable">
            <input
                name={name}
                readOnly={isReadOnly}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={event => handlerChange(event)}
                onFocus={handlerFocus}
            />

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
