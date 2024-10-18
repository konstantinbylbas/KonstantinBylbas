/** @format */

import {
    DifficultyType,
    iCell,
    iCheckIsGameEndedResult,
    PlayersCount,
} from './game/naughts-and-crosses.type';
import { LanguageType } from './language.type';
import { FirebaseCollection, FirebaseTable } from './portfolio/data.type';

export interface iInjectorProvider {
    NaughtsAndCrosses: iNaughtsAndCrosses;
    TelegramService: iTelegramService;
    FirebaseService: iFirebaseService;
    TranslationService: iTranslationService;
}

export interface iNaughtsAndCrosses {
    dificulty: DifficultyType;

    init(): iCell[];

    checkIsGameEnded(board: iCell[]): iCheckIsGameEndedResult;

    aiStep(board: iCell[]): number;
}

export interface iTelegramService {
    sendMessage(message: string): Promise<void>;
}

export interface iFirebaseService {
    getTableData(
        collection: FirebaseCollection,
        table: FirebaseTable,
    ): Promise<any[]>;
}

export interface iTranslationService {
    init(): void;
    get language(): LanguageType;
    set language(value: LanguageType);
    get translation(): any;
}
