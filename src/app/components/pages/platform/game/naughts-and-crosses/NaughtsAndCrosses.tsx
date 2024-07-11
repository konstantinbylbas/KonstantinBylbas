/** @format */

import injectorService from '@app/services/injector.service';
import './NaughtsAndCrosses.scss';
import { useEffect, useState } from 'react';
import { CellType, iCell } from '@app/types/game/naughts-and-crosses.type';

export default function NaughtsAndCrosses() {
    const [board, setBoard] = useState<iCell[]>([]);
    const [isPreviousFirstPlayer, setIsPreviousFirstPlayer] = useState(false);

    const NaughtsAndCrossesService = injectorService.get('NaughtsAndCrosses');

    useEffect(() => {
        initGame();
    }, []);

    function initGame(): void {
        const board = NaughtsAndCrossesService.init();
        setBoard(board);
        setIsPreviousFirstPlayer(false);
    }

    function selectCell(cell: iCell): void {
        if (cell.value !== CellType.DEFAULT) {
            return;
        }

        const updatedBoard = [...board];
        const cellIndex = updatedBoard.findIndex(
            boardCell => boardCell === cell,
        );

        if (cellIndex !== -1) {
            updatedBoard[cellIndex] = {
                ...updatedBoard[cellIndex],
                value: isPreviousFirstPlayer ? CellType.ZERO : CellType.CROSS,
            };
        }

        setBoard(updatedBoard);
        setIsPreviousFirstPlayer(!isPreviousFirstPlayer);
        checkResult();
    }

    function checkResult(): void {}

    return (
        <div className="naughtsAndCrosses">
            <div className="naughtsAndCrosses_board">
                {board.map((cell, i) => (
                    <div
                        className={`naughtsAndCrosses_board_cell ${cell.value !== CellType.DEFAULT ? cell.value : ''}`}
                        onClick={() => selectCell(cell)}
                        key={`naughtsAndCrosses cell#${i}`}>
                        {cell.value === CellType.ZERO ? (
                            <svg>
                                <circle></circle>
                            </svg>
                        ) : (
                            ''
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
