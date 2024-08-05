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

    public aiStep(board: iCell[]): number {
        const difficultyMap: Record<DifficultyType, Function> = {
            [DifficultyType.EASY]: () => this.aiEasyDifficultyChoise(board),
            [DifficultyType.MEDIUM]: () => this.aiEasyDifficultyChoise(board),
            [DifficultyType.HARD]: () => this.aiHardDifficultyChoise(board),
        };

        return difficultyMap[this.dificulty]();
    }

    private aiEasyDifficultyChoise(board: iCell[]): number {
        const emptyCells = board
            .map((cell, index) =>
                cell.value === CellType.DEFAULT ? index : -1,
            )
            .filter(index => index !== -1);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCellIndex = emptyCells[randomIndex];

        return randomCellIndex;
    }

    private aiMediumDifficultyChoise(board: iCell[]): number {
        return 0;
    }

    private aiHardDifficultyChoise(board: iCell[]): number {
        const bestStart = 4;
        const goodStart = [0, 2, 6, 8];

        const filledCellsByAi = this.getFilledCellsByType(board, CellType.ZERO);
        const filledCellsByUser = this.getFilledCellsByType(board, CellType.CROSS);

        if (filledCellsByAi.length === 0) {
            const emptyCells = board
                .map((cell, index) =>
                    cell.value === CellType.DEFAULT ? index : -1,
                )
                .filter(index => index !== -1);

            if (emptyCells.includes(bestStart)) {
                return bestStart;
            } else {
                const randomIndex = Math.floor(
                    Math.random() * goodStart.length,
                );
                return goodStart[randomIndex];
            }
        }

        if (filledCellsByAi.length > 1) {
            const checkResult = this.checkMatchingCombinations(board, filledCellsByAi, CellType.CROSS);
            console.log(checkResult);

            if (checkResult) {
                return (
                    checkResult.find(
                        index => !filledCellsByAi.includes(index),
                    ) || 0
                );
            }
        }

        if (filledCellsByUser.length > 1) {
            const checkResult =
                this.checkMatchingCombinations(board, filledCellsByUser, CellType.ZERO);
            console.log(checkResult);
            if (checkResult) {
                return (
                    checkResult.find(
                        index => !filledCellsByUser.includes(index),
                    ) || 0
                );
            }
        }

        console.log('no sol');

        return 0;
    }

    private getFilledCellsByType(board: iCell[], type: CellType): number[] {
        return board
            .map((cell, index) => (cell.value === type ? index : -1))
            .filter(index => index !== -1);
    }

    private checkMatchingCombinations(board: iCell[], values: number[], type: CellType): number[] | undefined {
        const filledCells = this.getFilledCellsByType(board, type);
        const possibleCombinations = this.winningCombinations
            .filter(combination => !combination.every(index => !filledCells.includes(index)))

        console.log(possibleCombinations);
        

        for (const combination of possibleCombinations) {
            let matches = 0;

            for (const value of values) {
                if (combination.includes(value)) {
                    matches++;
                }

                if (matches === 2) {
                    return combination;
                }
            }
        }
        return;
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
