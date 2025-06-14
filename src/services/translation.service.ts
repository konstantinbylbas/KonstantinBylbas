/** @format */

import { LanguageType } from '@_types/language.type';

export class translationService {
    private readonly storageKey = 'lang';
    private currentLanguage: LanguageType = LanguageType.EN;
    private languagePack: { [key: string]: {} } = {};

    constructor() {
        this.init();
    }

    public init(): void {
        const storageLanguage =
            Number(localStorage.getItem(this.storageKey)) || LanguageType.EN;
        this.currentLanguage = storageLanguage as LanguageType;

        this.loadLanguagePack();
    }

    private loadLanguagePack(): void {
        this.languagePack = require(
            `@assets/locales/${LanguageType[this.currentLanguage].toLowerCase()}.json`,
        );
    }

    public get language(): LanguageType {
        return this.currentLanguage;
    }

    public set language(value: LanguageType) {
        this.currentLanguage = value;
        localStorage.setItem(this.storageKey, value.toString());
        this.loadLanguagePack();
    }

    public get translation(): any {
        return this.languagePack;
    }
}

export const TranslationService = new translationService();
