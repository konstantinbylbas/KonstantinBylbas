/** @format */

import { useState } from 'react';
import './Select.scss';
import { SelectItem, SelectProps } from '@_types/select.type';

export function Select({
    isDisabled,
    itemsList,
    selectedItem,
    onChange,
    ...args
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    function getOptionLabel(option: SelectItem | string | number): string {
        if (!option) {
            console.error('Option is undefined');
            return '';
        }

        if (typeof option === 'string' || typeof option === 'number') {
            return option.toString();
        } else {
            return option.name;
        }
    }

    function handlerChange(option: any): void {
        if (onChange) {
            onChange(option);
        }

        setIsOpen(false);
    }

    return (
        <div
            className={`select ${isOpen ? 'open' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            {...args}>
            <div className="select_selected-option">
                <span>{getOptionLabel(selectedItem)}</span>
                <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
            </div>
            <div className="select_options-list">
                {itemsList.length &&
                    itemsList.map((option, i) => (
                        <div
                            className={`select_options-list_option ${
                                getOptionLabel(selectedItem) ===
                                getOptionLabel(option)
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => handlerChange(option)}
                            key={`select option #${i}`}>
                            {getOptionLabel(option)}
                        </div>
                    ))}
            </div>
        </div>
    );
}
