/** @format */

import { IconType } from '@_types/image.type';
import './LanguageSelector.scss';
import { useState } from 'react';
import {
    LanguageSelectorProps,
    LanguageListAlign,
    LanguageType,
} from '@_types/language.type';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@store/slices/translationSlice';
import { RootState } from '@store/index';

export function LanguageSelector({
    align = LanguageListAlign.DEFAULT,
}: LanguageSelectorProps) {
    const [isOpenLanguageSelector, setIsOpenLanguageSelector] = useState(false);

    const languages = Object.values(LanguageType).filter(
        value => typeof value === 'string',
    );

    const dispatch = useDispatch();
    const currentLanguage = useSelector(
        (state: RootState) => state.translation.language,
    );

    const changeLanguage = (langKey: keyof typeof LanguageType) => {
        dispatch(setLanguage(LanguageType[langKey]));
    };

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
                            listItem === LanguageType[currentLanguage]
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
