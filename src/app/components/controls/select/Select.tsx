/** @format */

import { useState } from 'react';
import './Select.scss';
import { SelectProps } from '@app/types/select.type';

export default function Select({
    name,
    isDisabled,
    itemsList,
    onChange,
}: SelectProps) {
    const [selectedValue, setSelectedValue] = useState(itemsList[0]);
    const [isOpen, setIsOpen] = useState(false);

    function handlerChange(option: any): void {
        if (onChange) {
            onChange(option);
        }

        setSelectedValue(option);
        setIsOpen(false);
    }

    return (
        <div
            className={`select ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}>
            <div className="select_selected-option">
                <span>{selectedValue.name}</span>
                <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
            </div>
            <div className="select_options-list">
                {itemsList.map((option, i) => (
                    <div
                        className={`select_options-list_option ${selectedValue.name === option.name && selectedValue.value === option.value ? 'active' : ''}`}
                        onClick={() => handlerChange(option)}
                        key={`select option #${i}`}>
                        {option.value}
                    </div>
                ))}
            </div>
        </div>
    );
}
