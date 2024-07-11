/** @format */

export enum CellType {
    DEFAULT,
    ZERO = 'zero',
    CROSS = 'cross',
}

export interface iCell {
    value: CellType;
}
