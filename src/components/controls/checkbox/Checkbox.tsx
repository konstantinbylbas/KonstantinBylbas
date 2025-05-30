/** @format */

import './Checkbox.scss';

export function Checkbox({
    id,
    label,
    isChecked,
    onClick,
}: {
    id: string;
    label?: string;
    isChecked: boolean;
    onClick: Function;
}) {
    function handlerClick(target: any): void {
        const value = target.checked;

        onClick(value);
    }

    return (
        <div className="checkbox">
            <input
                type="checkbox"
                name="checkbox"
                id={id}
                defaultChecked={isChecked}
                onChange={({ target }) => handlerClick(target)}
            />
            <div className="styledCheckbox"></div>
            <label htmlFor={id}>{label ? <p>{label}</p> : ''}</label>
        </div>
    );
}
