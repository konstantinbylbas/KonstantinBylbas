/** @format */

import { useEffect, useState } from 'react';
import './Select.scss';
import { SelectItem, SelectProps } from '@app/types/select.type';

export default function Select({
    isDisabled,
    itemsList,
    selectedItem,
    onChange,
}: SelectProps) {
    const [selectedValue, setSelectedValue] = useState(
        selectedItem || itemsList[0],
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedItem !== undefined) {
            setSelectedValue(selectedItem);
        }
    }, [selectedItem]);

    function getOptionLabel(option: SelectItem | string | number): string {
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

        setSelectedValue(selectedItem || option);
        setIsOpen(false);
    }

    return (
        <div
            className={`select ${isOpen ? 'open' : ''} ${isDisabled ? 'disabled' : ''}`}
            onClick={() => setIsOpen(!isOpen)}>
            <div className="select_selected-option">
                <span>{getOptionLabel(selectedValue)}</span>
                <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
            </div>
            <div className="select_options-list">
                {itemsList.length &&
                    itemsList.map((option, i) => (
                        <div
                            className={`select_options-list_option ${
                                getOptionLabel(selectedValue) ===
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
