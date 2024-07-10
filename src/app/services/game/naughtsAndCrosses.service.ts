/** @format */

import { iNaughtsAndCrosses } from '@app/types/injector.type';

export default class NaughtsAndCrossesService implements iNaughtsAndCrosses {
    public playersNumber: 1 | 2 = 1;

    public init(): void {

    }
}

class Board {}

class Cell {}
