/** @format */

import './Textarea.scss';
import { TextareaProps } from '@app/types/textarea.type';

export default function Textarea({
    name,
    isReadOnly,
    placeholder,
    value,
    onChange,
    onFocus,
}: TextareaProps) {
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
        <div className="textarea hoverable">
            <textarea
                name={name}
                readOnly={isReadOnly}
                placeholder={placeholder}
                value={value}
                onChange={(event) => handlerChange(event)}
                onFocus={handlerFocus}></textarea>

            <div className="verticalPseudoElement"></div>
            <div className="horizontalPseudoElement"></div>
        </div>
    );
}
