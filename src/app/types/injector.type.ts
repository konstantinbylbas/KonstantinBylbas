/** @format */

export interface iInjectorProvider {
    NaughtsAndCrosses: iNaughtsAndCrosses
}

export interface iNaughtsAndCrosses {
    playersNumber: 1 | 2;

    init(): void;
}
