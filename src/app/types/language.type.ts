/** @format */

export enum LanguageType {
    EN,
    UA,
}

export enum LanguageListAlign {
    DEFAULT = 'default',
    TOP = 'top',
}

export interface LanguageSelectorProps {
    align?: LanguageListAlign;
}
