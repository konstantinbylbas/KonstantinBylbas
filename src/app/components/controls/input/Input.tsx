/** @format */

import { InputProps } from '@app/types/input.type';
import './Input.scss';

export default function Input({
    isReadOnly,
    placeholder,
    value,
    onChange,
    onFocus,
}: InputProps) {
    function handlerChange(value: string): void {
        if (onChange) {
            onChange(value);
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
                readOnly={isReadOnly}
                type="text"
                placeholder={placeholder}
                defaultValue={value}
                onChange={({ target }) => handlerChange(target.value)}
                onFocus={handlerFocus}
            />

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
