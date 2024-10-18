/** @format */

export interface SelectProps {
    isDisabled?: boolean;
    itemsList: SelectItem[] | string[] | number[];
    selectedItem: SelectItem | string | number;
    onChange?: Function;
    args?: any[];
}

export interface SelectItem {
    name: string;
    value: any;
}
