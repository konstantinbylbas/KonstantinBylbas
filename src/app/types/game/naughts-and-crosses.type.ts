/** @format */

export enum CellType {
    DEFAULT = 'default',
    ZERO = 'zero',
    CROSS = 'cross',
}

export interface iCell {
    value: CellType;
}

export interface iCheckIsGameEndedResult {
    status: boolean;
    winner?: CellType;
}

export enum PlayersCount {
    ONE = '1',
    TWO = '2',
}

export enum DifficultyType {
    EASY,
    MEDIUM,
    HARD,
}
