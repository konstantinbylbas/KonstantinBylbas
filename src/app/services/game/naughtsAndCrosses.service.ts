/** @format */

import {
    CellType,
    DifficultyType,
    iCell,
    iCheckIsGameEndedResult,
    PlayersCount,
} from '@app/types/game/naughts-and-crosses.type';
import { iNaughtsAndCrosses } from '@app/types/injector.type';

export default class NaughtsAndCrossesService implements iNaughtsAndCrosses {
    public playersCount: PlayersCount = PlayersCount.ONE;
    public dificulty: DifficultyType = DifficultyType.EASY;

    private readonly boardInstance = new Board();
    private readonly winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    public init(): iCell[] {
        const board = this.boardInstance.get();
        return board;
    }

    public checkIsGameEnded(board: iCell[]): iCheckIsGameEndedResult {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;

            if (
                board[a].value !== CellType.DEFAULT &&
                board[a].value === board[b].value &&
                board[a].value === board[c].value
            ) {
                return { status: true, winner: board[a].value };
            }
        }

        if (board.every(cell => cell.value !== CellType.DEFAULT)) {
            return { status: true };
        }

        return { status: false };
    }
}

class Board {
    private readonly boardLength: number = 9;
    private readonly cell = new Cell();

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
