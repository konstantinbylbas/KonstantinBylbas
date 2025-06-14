/** @format */

import {
    CellType,
    DifficultyType,
    iCell,
    iCheckIsGameEndedResult,
} from '@_types/game/naughts-and-crosses.type';

export class naughtsAndCrossesService {
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
    private bestStart = 4;
    private goodStart = [0, 2, 6, 8];

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

        const bestChoise = this.getWinningMove(board);
        if (bestChoise !== -1) {
            return bestChoise;
        }

        return this.aiRandomMove(board);
    }

    private aiHardDifficultyMove(board: iCell[]): number {
        if (this.isFirstAiMove(board)) {
            return this.getBestStartMove(board);
        }

        const bestChoise = this.getWinningMove(board);
        if (bestChoise !== -1) {
            return bestChoise;
        }

        for (let cell of this.goodStart) {
            if (board[cell].value === CellType.DEFAULT) {
                return cell;
            }
        }

        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            const values = [board[a].value, board[b].value, board[c].value];

            if (
                values.filter(value => value === CellType.ZERO).length === 1 &&
                values.includes(CellType.DEFAULT)
            ) {
                return combination[values.indexOf(CellType.DEFAULT)];
            }
        }

        return this.aiRandomMove(board);
    }

    private isFirstAiMove(board: iCell[]): boolean {
        return this.getFilledCellsByType(board, CellType.ZERO).length === 0;
    }

    private getBestStartMove(board: iCell[]): number {
        if (board[this.bestStart].value === CellType.DEFAULT) {
            return this.bestStart;
        }

        // shuffle goodStart array
        for (let i = this.goodStart.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.goodStart[i], this.goodStart[j]] = [
                this.goodStart[j],
                this.goodStart[i],
            ];
        }

        return (
            this.goodStart.find(
                index => board[index].value === CellType.DEFAULT,
            ) || 0
        );
    }

    private getWinningMove(board: iCell[]): number {
        const aiWinningMove = this.findWinningMove(board, CellType.ZERO);
        if (aiWinningMove !== -1) {
            return aiWinningMove;
        }

        const userWinningMove = this.findWinningMove(board, CellType.CROSS);
        if (userWinningMove !== -1) {
            return userWinningMove;
        }

        return -1;
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
            .map((cell, index) =>
                cell.value === CellType.DEFAULT ? index : -1,
            )
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

export const NaughtsAndCrossesService = new naughtsAndCrossesService();
