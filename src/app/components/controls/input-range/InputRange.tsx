/** @format */

import './InputRange.scss';

export default function InputRange({ value, onChange }: { value: number, onChange: Function }) {
    function handlerChange(target: any): void {
        const value = target.value;

        onChange(value);
    }

    return (
        <div className="inputRange">
            <input
                type="range"
                defaultValue={value}
                min={0}
                max={100}
                step={1}
                onChange={({ target }) => {
                    handlerChange(target);
                }}
            />
        </div>
    );
}
