/** @format */

import './PortfolioNav.scss';
import { IconType } from '@_types/image.type';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ScreenPlatformPath, ScreenType } from '@_types/screen.type';
import { LanguageSelector } from '@components/common/language-selector/LanguageSelector';

interface iTab {
    img: string;
    link: string;
}

export default function PortfolioNav() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const portfolioTabs: iTab[] = [
        {
            img: IconType.HOME,
            link: `/${ScreenType.PORTFOLIO}`,
        },
        {
            img: IconType.PERSON,
            link: `/${ScreenType.PORTFOLIO}#summary`,
        },
        {
            img: IconType.BRIEFCASE,
            link: `/${ScreenType.PORTFOLIO}#examples`,
        },
        {
            img: IconType.MAIL,
            link: `/${ScreenType.PORTFOLIO}#contacts`,
        },
        {
            img: IconType.PLATFORM,
            link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}`,
        },
    ];

    return (
        <div className="portfolioNav">
            <LanguageSelector />

            <div
                className="burger"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                data-testid="burger">
                <img src={IconType.BURGER} alt="Burger menu button" />
            </div>

            <div className={`tabs column ${isOpenMenu ? 'active' : ''}`}>
                {portfolioTabs.map((tab, i) => (
                    <Link
                        to={tab.link}
                        className={
                            tab.link.includes(ScreenType.PLATFORM)
                                ? 'platform'
                                : ''
                        }
                        data-testid={`portfolio-tab-${i}`}
                        key={`portfolio tab #${i}`}>
                        <img src={tab.img} alt={`portfolio tab #${i}`} />
                    </Link>
                ))}
            </div>

            <span></span>
        </div>
    );
}
