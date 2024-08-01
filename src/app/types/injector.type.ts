/** @format */

import {
    DifficultyType,
    iCell,
    iCheckIsGameEndedResult,
    PlayersCount,
} from './game/naughts-and-crosses.type';

export interface iInjectorProvider {
    NaughtsAndCrosses: iNaughtsAndCrosses;
    TelegramService: iTelegramService;
}

export interface iNaughtsAndCrosses {
    playersCount: PlayersCount;
    dificulty: DifficultyType;

    init(): iCell[];

    checkIsGameEnded(board: iCell[]): iCheckIsGameEndedResult;
}

export interface iTelegramService {
    sendMessage(message: string): Promise<void>;
}
