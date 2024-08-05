/** @format */

import injectorService from '@app/services/injector.service';
import './NaughtsAndCrosses.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import {
    CellType,
    DifficultyType,
    iCell,
    PlayersCount,
} from '@app/types/game/naughts-and-crosses.type';
import { NotificationContext } from '@app/contexts/notificationContext';
import { NotificationType } from '@app/types/notification.type';
import Button from '@app/components/controls/button/Button';
import Select from '@app/components/controls/select/Select';

export default function NaughtsAndCrosses() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [board, setBoard] = useState<iCell[]>([]);
    const [isPreviousFirstPlayer, setIsPreviousFirstPlayer] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const NaughtsAndCrossesService = injectorService.get('NaughtsAndCrosses');

    const playersCountList = Object.keys(PlayersCount);
    const difficultsList = Object.keys(DifficultyType).filter(key =>
        isNaN(Number(key)),
    );

    const minFilledCellsForEnd = 5;
    const aiStepDuration = 0.5;
    const finishTimeout = 3;
    const newGameTimeoutRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        initGame();

        return () => {
            handlerClearTimeout();
        };
    }, []);

    useEffect(() => {
        checkResult();
    }, [board]);

    useEffect(() => {
        if (checkIsAiNextStep()) {
            aiMove();
        }
    }, [isPreviousFirstPlayer]);

    function getFilledCellsCount(): number {
        return board.filter(cell => cell.value !== CellType.DEFAULT).length;
    }

    function checkIsAiNextStep(): boolean {
        return (
            !isGameFinished &&
            getFilledCellsCount() > 0 &&
            isPreviousFirstPlayer &&
            NaughtsAndCrossesService.playersCount === PlayersCount.ONE
        );
    }

    function initGame(): void {
        const board = NaughtsAndCrossesService.init();
        setBoard(board);
        setIsPreviousFirstPlayer(false);
        setIsGameFinished(false);
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
        setTimeout(() => {
            setIsPreviousFirstPlayer(!isPreviousFirstPlayer);
        }, 0);
    }

    function checkResult(): void {
        if (getFilledCellsCount() < minFilledCellsForEnd) {
            return;
        }

        const result = NaughtsAndCrossesService.checkIsGameEnded(board);

        let message = '';

        if (!result.status) {
            return;
        }

        setIsGameFinished(true);

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

        newGameTimeoutRef.current = setTimeout(() => {
            initGame();
        }, finishTimeout * 1000);
    }

    function restart(): void {
        handlerClearTimeout();
        initGame();
    }

    function handlerClearTimeout(): void {
        if (newGameTimeoutRef.current) {
            clearTimeout(newGameTimeoutRef.current);
        }
    }

    function changePlayersCount(value: keyof typeof PlayersCount): void {
        NaughtsAndCrossesService.playersCount = PlayersCount[value];

        initGame();
    }

    function changeDifficulty(value: keyof DifficultyType): void {
        NaughtsAndCrossesService.dificulty =
            DifficultyType[value as keyof typeof DifficultyType];

        initGame();
    }

    function aiMove(): void {
        setTimeout(() => {
            const cellIndex = NaughtsAndCrossesService.aiStep(board);
            selectCell(board[cellIndex]);
        }, aiStepDuration * 1000);
    }

    return (
        <div className="naughtsAndCrosses">
            <div className="naughtsAndCrosses_controls">
                <div className="column">
                    <Select
                        itemsList={playersCountList}
                        onChange={changePlayersCount}
                    />

                    {NaughtsAndCrossesService.playersCount ===
                    PlayersCount.ONE ? (
                        <Select
                            itemsList={difficultsList}
                            onChange={changeDifficulty}
                        />
                    ) : (
                        ''
                    )}
                </div>

                <Button label="Restart" handlerClick={restart} />
            </div>

            <div
                className={`naughtsAndCrosses_board ${isGameFinished ? 'finished' : ''}`}>
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
