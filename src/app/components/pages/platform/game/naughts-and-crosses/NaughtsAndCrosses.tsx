/** @format */

import injectorService from '@app/services/injector.service';
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
} from '@app/types/game/naughts-and-crosses.type';
import { NotificationContext } from '@app/contexts/notificationContext';
import { NotificationType } from '@app/types/notification.type';
import Button from '@app/components/controls/button/Button';
import Select from '@app/components/controls/select/Select';
import { TranslationContext } from '@app/contexts/translationContext';

interface iSettings {
    playersCount: PlayersCount;
    difficulty: DifficultyType;
}

export default function NaughtsAndCrosses() {
    const { contextTranslation } = useContext(TranslationContext);
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [board, setBoard] = useState<iCell[]>([]);
    const [isPreviousFirstPlayer, setIsPreviousFirstPlayer] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const NaughtsAndCrossesService = injectorService.get('NaughtsAndCrosses');

    const texts = useMemo(
        () => contextTranslation.Games.naughtsAndCrosses,
        [contextTranslation],
    );

    const playersCountList = Object.keys(PlayersCount).map(
        value => texts.playersCount[value.toLowerCase()],
    );
    const difficultsList = Object.keys(DifficultyType)
        .filter(key => isNaN(Number(key)))
        .map(value => texts.difficulty[value.toLowerCase()]);

    const lsSettingsKey = 'Tic tac toe - settings';
    const minFilledCellsForEnd = 5;
    const aiStepDuration = 0.5;
    const finishTimeout = 3;
    const newGameTimeoutRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        const settings = getSettingsFromLS();

        if (settings?.playersCount) {
            NaughtsAndCrossesService.playersCount = settings.playersCount;
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
        (value: keyof typeof PlayersCount) => {
            const playersCount = PlayersCount[value];
            NaughtsAndCrossesService.playersCount = playersCount;

            setSettingsToLS({ playersCount });

            initGame();
        },
        [],
    );

    const changeDifficulty = useCallback((value: keyof DifficultyType) => {
        const difficulty = DifficultyType[value as keyof typeof DifficultyType];

        NaughtsAndCrossesService.dificulty = difficulty;

        setSettingsToLS({ difficulty });

        initGame();
    }, []);

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
                        selectedItem={
                            playersCountList[
                                +NaughtsAndCrossesService.playersCount - 1
                            ]
                        }
                        onChange={changePlayersCount}
                        data-testid='players-count-list'
                    />

                    {NaughtsAndCrossesService.playersCount ===
                    PlayersCount.ONE ? (
                        <Select
                            itemsList={difficultsList}
                            selectedItem={
                                difficultsList[
                                    NaughtsAndCrossesService.dificulty
                                ]
                            }
                            onChange={changeDifficulty}
                            data-testid='difficulty-list'
                        />
                    ) : (
                        ''
                    )}
                </div>

                <Button label={texts.restart} handlerClick={restart} />
            </div>

            <div
                className={`naughtsAndCrosses_board ${
                    isGameFinished ||
                    (isPreviousFirstPlayer &&
                        NaughtsAndCrossesService.playersCount ===
                            PlayersCount.ONE)
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
