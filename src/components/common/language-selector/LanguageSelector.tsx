/** @format */

import { IconType } from '@_types/image.type';
import './LanguageSelector.scss';
import { useContext, useState } from 'react';
import {
    LanguageSelectorProps,
    LanguageListAlign,
    LanguageType,
} from '@_types/language.type';
import { TranslationContext } from '@contexts/translationContext';
import { TranslationService } from '@services/translation.service';

export function LanguageSelector({
    align = LanguageListAlign.DEFAULT,
}: LanguageSelectorProps) {
    const { setContextTranslation } = useContext(TranslationContext);

    const [isOpenLanguageSelector, setIsOpenLanguageSelector] = useState(false);

    const languages = Object.values(LanguageType).filter(
        value => typeof value === 'string',
    );

    function changeLanguage(value: keyof LanguageType): void {
        TranslationService.language =
            LanguageType[value as keyof typeof LanguageType];
        updateLanguageContext();
    }

    function updateLanguageContext(): void {
        setContextTranslation(TranslationService.translation);
    }

    return (
        <div
            className="languageSelector"
            onClick={() => setIsOpenLanguageSelector(!isOpenLanguageSelector)}>
            <figure>
                <img
                    src={IconType.LANGUAGE}
                    alt="language selector"
                    title="Language selector"
                />
            </figure>
            <div
                className={`languageSelector_list ${align} ${isOpenLanguageSelector ? 'active' : ''}`}>
                {languages.map(listItem => (
                    <p
                        key={listItem}
                        className={
                            listItem ===
                            LanguageType[TranslationService.language]
                                ? 'active'
                                : ''
                        }
                        onClick={() => changeLanguage(listItem as any)}>
                        {listItem}
                    </p>
                ))}
            </div>
        </div>
    );
}
