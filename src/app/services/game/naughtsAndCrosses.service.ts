/** @format */

import { CellType, iCell } from '@app/types/game/naughts-and-crosses.type';
import { iNaughtsAndCrosses } from '@app/types/injector.type';

export default class NaughtsAndCrossesService implements iNaughtsAndCrosses {
    public playersNumber: 1 | 2 = 1;

    public init(): iCell[] {
        const board = new Board();
        return board.get();
    }
}

class Board {
    private boardLength: number = 9;
    private cell = new Cell();

    public get(): iCell[] {
        const cells: iCell[] = Array.from({ length: this.boardLength }, () =>
            this.cell.get(),
        );

        return cells;
    }
}

class Cell {
    public get(): iCell {
        return {
            value: CellType.DEFAULT,
        };
    }
}
