/** @format */

import injectorService from '@app/services/injector.service';
import './NaughtsAndCrosses.scss';
import { useContext, useEffect, useState } from 'react';
import { CellType, iCell } from '@app/types/game/naughts-and-crosses.type';
import { NotificationContext } from '@app/contexts/notificationContext';
import { NotificationType } from '@app/types/notification.type';

export default function NaughtsAndCrosses() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [board, setBoard] = useState<iCell[]>([]);
    const [isPreviousFirstPlayer, setIsPreviousFirstPlayer] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);

    const NaughtsAndCrossesService = injectorService.get('NaughtsAndCrosses');

    const minFilledCellsForEnd = 5;
    const finishTimeout = 3;

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        const filledCellsCount = board.filter(
            cell => cell.value !== CellType.DEFAULT,
        ).length;

        if (filledCellsCount < minFilledCellsForEnd) {
            return;
        }

        checkResult();
    }, [board]);

    function initGame(): void {
        const board = NaughtsAndCrossesService.init();
        setBoard(board);
        setIsPreviousFirstPlayer(false);
        setGameFinished(false);
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
    }

    function checkResult(): void {
        const result = NaughtsAndCrossesService.checkIsGameEnded(board);

        let message = '';

        if (!result.status) {
            return;
        }

        setGameFinished(true);

        if (result.winner) {
            message = `Winner: ${result.winner === CellType.CROSS ? 'X' : 'O'}`;
        } else {
            message = 'No winner';
        }

        setContextNotification([
            ...contextNotification,
            {
                type: NotificationType.INFO,
                message,
            },
        ]);

        setTimeout(() => {
            initGame();
        }, finishTimeout * 1000);
    }

    return (
        <div className="naughtsAndCrosses">
            <div
                className={`naughtsAndCrosses_board ${gameFinished ? 'finished' : ''}`}>
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
