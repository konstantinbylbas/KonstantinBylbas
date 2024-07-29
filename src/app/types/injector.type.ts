/** @format */

import {
    iCell,
    iCheckIsGameEndedResult,
} from './game/naughts-and-crosses.type';

export interface iInjectorProvider {
    NaughtsAndCrosses: iNaughtsAndCrosses;
    TelegramService: iTelegramService;
}

export interface iNaughtsAndCrosses {
    playersNumber: 1 | 2;

    init(): iCell[];

    checkIsGameEnded(board: iCell[]): iCheckIsGameEndedResult;
}

export interface iTelegramService {
    sendMessage(message: string): Promise<void>;
}
