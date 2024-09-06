/** @format */

import { Link, useLocation } from 'react-router-dom';
import './Nav.scss';
import { ImageType } from '@app/types/image.type';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';
import { LanguageType } from '@app/types/language.type';
import injectorService from '@app/services/injector.service';
import { TranslationContext } from '@app/contexts/translationContext';

interface iTab {
    img?: string;
    link?: string;
    tabs?: iTab[];
}

export default function Nav() {
    const { setContextTranslation } = useContext(TranslationContext);

    const location = useLocation();

    const [isOpenLanguageSelector, setIsOpenLanguageSelector] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);

    const subtabsRef = useRef<HTMLDivElement | null>(null);

    const TranslationService = injectorService.get('TranslationService');

    const languages = Object.values(LanguageType).filter(
        value => typeof value === 'string',
    );
    const portfolioTabs: iTab[] = [
        {
            img: ImageType.HOME,
            link: `/${ScreenType.PORTFOLIO}`,
        },
        {
            img: ImageType.PERSON,
            link: `/${ScreenType.PORTFOLIO}#summary`,
        },
        {
            img: ImageType.BRIEFCASE,
            link: `/${ScreenType.PORTFOLIO}#examples`,
        },
        {
            img: ImageType.MAIL,
            link: `/${ScreenType.PORTFOLIO}#contacts`,
        },
    ];
    const platformTabs: iTab[] = [
        {
            img: ImageType.GENERATOR_STRING,
            link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/`,
        },
        {
            img: ImageType.NAUGHTS_AND_CROSSES,
            link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GAME}/`,
        },
    ];

    const tabs = useMemo(() => updateTabs(), [location]);

    useEffect(() => {
        const anchor = location.hash.slice(1);

        setTimeout(() => {
            if (anchor) {
                document.getElementById(anchor)?.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        }, 0);
    }, [location]);

    function changeLanguage(value: keyof LanguageType): void {
        TranslationService.language =
            LanguageType[value as keyof typeof LanguageType];
        updateLanguageContext();
    }

    function updateLanguageContext(): void {
        setContextTranslation(TranslationService.translation);
    }

    function toggleSubtabs(subtabsMenu: HTMLDivElement | null): void {
        if (!subtabsMenu) {
            return;
        }

        if (isOpenSubmenu) {
            subtabsMenu.style.height = '0px';
        } else {
            subtabsMenu.style.height = subtabsMenu.scrollHeight + 16 + 'px';
        }

        setIsOpenSubmenu(!isOpenSubmenu);
    }

    function updateTabs(): iTab[] {
        const appSection = location.pathname.split('/')[1] as ScreenType;

        switch (appSection) {
            case ScreenType.PORTFOLIO:
                return [
                    ...portfolioTabs,
                    {
                        img: ImageType.PLATFORM,
                        tabs: platformTabs,
                    },
                ];

            case ScreenType.PLATFORM:
                return [
                    ...platformTabs,
                    { img: ImageType.LOGO, tabs: portfolioTabs },
                ];
        }
    }

    return (
        <nav>
            <div
                className="languageSelector"
                onClick={() =>
                    setIsOpenLanguageSelector(!isOpenLanguageSelector)
                }>
                <figure>
                    <img
                        src={ImageType.LANGUAGE}
                        alt="language selector"
                        title="Language selector"
                    />
                </figure>
                <div
                    className={`languageSelector_list ${isOpenLanguageSelector ? 'active' : ''}`}>
                    {languages.map(listItem => (
                        <p
                            key={listItem}
                            className={listItem === LanguageType[TranslationService.language] ? 'active' : ''}
                            onClick={() => changeLanguage(listItem as any)}>
                            {listItem}
                        </p>
                    ))}
                </div>
            </div>

            <div className="burger" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <img src={ImageType.BURGER} alt="Burger menu button" />
            </div>

            <div className={`tabs column ${isOpenMenu ? 'active' : ''}`}>
                {tabs.map((tab, i) =>
                    tab.link ? (
                        <Link to={tab.link} key={`portfolio tab #${i}`}>
                            <img src={tab.img} />
                        </Link>
                    ) : tab.tabs ? (
                        <div
                            className="tabs_subTabs column"
                            key={`portfolio tab #${i}`}>
                            <button
                                className={`tabs_subTabs_button ${isOpenSubmenu ? 'active' : ''}`}
                                onClick={() =>
                                    toggleSubtabs(subtabsRef.current)
                                }>
                                <img src={tab.img} />
                            </button>

                            <div
                                className={`tabs_subTabs_menu column ${isOpenSubmenu ? 'active' : ''}`}
                                onClick={event => {
                                    event.stopPropagation();
                                }}
                                ref={subtabsRef}>
                                {tab.tabs.map((subTab, k) =>
                                    subTab.link ? (
                                        <Link
                                            to={subTab.link}
                                            onClick={() => {
                                                setIsOpenMenu(!isOpenMenu);
                                                setIsOpenSubmenu(
                                                    !isOpenSubmenu,
                                                );
                                            }}
                                            key={`portfolio subTab #${k}`}>
                                            <img src={subTab.img} />
                                        </Link>
                                    ) : (
                                        ''
                                    ),
                                )}
                            </div>
                        </div>
                    ) : (
                        ''
                    ),
                )}
            </div>

            <span></span>
        </nav>
    );
}
