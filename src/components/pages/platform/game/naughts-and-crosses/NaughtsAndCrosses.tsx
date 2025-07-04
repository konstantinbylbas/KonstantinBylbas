/** @format */

import './NaughtsAndCrosses.scss';
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    CellType,
    DifficultyType,
    iCell,
    PlayersCount,
} from '@_types/game/naughts-and-crosses.type';
import { NotificationContext } from '@contexts/notificationContext';
import { NotificationType } from '@_types/notification.type';
import { Button, Select } from '@components/controls';
import { NaughtsAndCrossesService } from '@services/game/naughtsAndCrosses.service';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface iSettings {
    playersCount: PlayersCount;
    difficulty: DifficultyType;
}

export default function NaughtsAndCrosses() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [playersCount, setPlayersCount] = useState<PlayersCount>(
        PlayersCount.ONE,
    );
    const [board, setBoard] = useState<iCell[]>([]);
    const [isPreviousFirstPlayer, setIsPreviousFirstPlayer] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const translation = useSelector(
        (state: RootState) => state.translation.translation,
    );

    const texts = useMemo(() => translation.Games.naughtsAndCrosses, [translation]);

    const playersCountList = Object.keys(PlayersCount).map(value => ({
        value,
        name: texts.playersCount[value.toLowerCase()],
    }));
    const difficultsList = Object.keys(DifficultyType)
        .filter(key => isNaN(Number(key)))
        .map(value => ({
            value,
            name: texts.difficulty[value.toLowerCase()],
        }));

    const lsSettingsKey = 'Tic tac toe - settings';
    const minFilledCellsForEnd = 5;
    const aiStepDuration = 0.5;
    const finishTimeout = 3;
    const newGameTimeoutRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        const settings = getSettingsFromLS();

        if (settings?.playersCount) {
            setPlayersCount(settings.playersCount);
        }

        if (settings?.difficulty) {
            NaughtsAndCrossesService.dificulty = settings.difficulty;
        }

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

    function getSettingsFromLS(): iSettings | undefined {
        let settings: any = localStorage.getItem(lsSettingsKey);

        if (!settings) {
            return;
        }

        settings = JSON.parse(settings) as iSettings;

        return settings;
    }

    function setSettingsToLS(newParams: {
        playersCount?: PlayersCount;
        difficulty?: DifficultyType;
    }): void {
        let params = getSettingsFromLS() || {
            playersCount: PlayersCount.ONE,
            difficulty: DifficultyType.EASY,
        };

        params = {
            ...params,
            ...newParams,
        };

        localStorage.setItem(lsSettingsKey, JSON.stringify(params));
    }

    function getFilledCellsCount(): number {
        return board.filter(cell => cell.value !== CellType.DEFAULT).length;
    }

    function checkIsAiNextStep(): boolean {
        return (
            !isGameFinished &&
            getFilledCellsCount() > 0 &&
            isPreviousFirstPlayer &&
            playersCount === PlayersCount.ONE
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
            message = `${texts.winner}: ${result.winner === CellType.CROSS ? 'X' : 'O'}`;
        } else {
            message = texts.noWinner;
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

    const changePlayersCount = useCallback(
        ({ value }: { value: keyof typeof PlayersCount }) => {
            value = value.toUpperCase() as any;
            const newPlayersCount = PlayersCount[value];

            setPlayersCount(newPlayersCount);
            setSettingsToLS({ playersCount: newPlayersCount });

            initGame();
        },
        [],
    );

    const changeDifficulty = useCallback(
        ({ value }: { value: keyof DifficultyType }) => {
            value = value.toUpperCase() as any;
            const difficulty =
                DifficultyType[value as keyof typeof DifficultyType];

            NaughtsAndCrossesService.dificulty = difficulty;

            setSettingsToLS({ difficulty });

            initGame();
        },
        [],
    );

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
                        selectedItem={playersCountList[+playersCount - 1]}
                        onChange={changePlayersCount}
                        data-testid="players-count-list"
                    />

                    {playersCount === PlayersCount.ONE ? (
                        <Select
                            itemsList={difficultsList}
                            selectedItem={
                                difficultsList[
                                    NaughtsAndCrossesService.dificulty
                                ]
                            }
                            onChange={changeDifficulty}
                            data-testid="difficulty-list"
                        />
                    ) : (
                        ''
                    )}
                </div>

                <Button
                    label={texts.restart}
                    handlerClick={restart}
                    data-testid="restart"
                />
            </div>

            <div
                className={`naughtsAndCrosses_board ${
                    isGameFinished ||
                    (isPreviousFirstPlayer && playersCount === PlayersCount.ONE)
                        ? 'disabled'
                        : ''
                }`}>
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
