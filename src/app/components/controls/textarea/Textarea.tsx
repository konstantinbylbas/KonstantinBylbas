/** @format */

import './Textarea.scss';
import { TextareaProps } from '@app/types/textarea.type';

export default function Textarea({
    isReadOnly,
    placeholder,
    value,
    onChange,
    onFocus,
}: TextareaProps) {
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
        <div className="textarea hoverable">
            <textarea
                readOnly={isReadOnly}
                placeholder={placeholder}
                defaultValue={value}
                onChange={({ target }) => handlerChange(target.value)}
                onFocus={handlerFocus}></textarea>

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
