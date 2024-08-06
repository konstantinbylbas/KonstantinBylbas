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
        return this.boardInstance.get();
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

    public aiStep(board: iCell[]): number {
        const aiStrategyMap: Record<DifficultyType, () => number> = {
            [DifficultyType.EASY]: () => this.aiRandomMove(board),
            [DifficultyType.MEDIUM]: () => this.aiMediumDifficultyMove(board),
            [DifficultyType.HARD]: () => this.aiHardDifficultyMove(board),
        };

        return aiStrategyMap[this.dificulty]();
    }

    private aiRandomMove(board: iCell[]): number {
        const emptyCells = this.getEmptyCells(board);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    private aiMediumDifficultyMove(board: iCell[]): number {
        if (this.isFirstAiMove(board)) {
            return this.aiRandomMove(board);
        }
        return this.aiHardDifficultyMove(board);
    }

    private aiHardDifficultyMove(board: iCell[]): number {
        if (this.isFirstAiMove(board)) {
            return this.getBestStartMove(board);
        }

        const aiWinningMove = this.findWinningMove(board, CellType.ZERO);
        if (aiWinningMove !== -1) {
            return aiWinningMove;
        }

        const userWinningMove = this.findWinningMove(board, CellType.CROSS);
        if (userWinningMove !== -1) {
            return userWinningMove;
        }

        return this.aiRandomMove(board);
    }

    private isFirstAiMove(board: iCell[]): boolean {
        return this.getFilledCellsByType(board, CellType.ZERO).length === 0;
    }

    private getBestStartMove(board: iCell[]): number {
        const bestStart = 4;
        const goodStart = [0, 2, 6, 8];

        if (board[bestStart].value === CellType.DEFAULT) {
            return bestStart;
        }

        return goodStart.find(index => board[index].value === CellType.DEFAULT) || 0;
    }

    private findWinningMove(board: iCell[], type: CellType): number {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            const values = [board[a].value, board[b].value, board[c].value];

            if (
                values.filter(value => value === type).length === 2 &&
                values.includes(CellType.DEFAULT)
            ) {
                return combination[values.indexOf(CellType.DEFAULT)];
            }
        }

        return -1;
    }

    private getEmptyCells(board: iCell[]): number[] {
        return board
            .map((cell, index) => (cell.value === CellType.DEFAULT ? index : -1))
            .filter(index => index !== -1);
    }

    private getFilledCellsByType(board: iCell[], type: CellType): number[] {
        return board
            .map((cell, index) => (cell.value === type ? index : -1))
            .filter(index => index !== -1);
    }
}

class Board {
    private readonly boardLength: number = 9;
    private readonly cell = new Cell();

    public get(): iCell[] {
        return Array.from({ length: this.boardLength }, () => this.cell.get());
    }
}

class Cell {
    public get(): iCell {
        return {
            value: CellType.DEFAULT,
        };
    }
}
