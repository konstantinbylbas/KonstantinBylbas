/** @format */

import LanguageSelector from '@app/components/common/language-selector/LanguageSelector';
import './PortfolioNav.scss';
import { ImageType } from '@app/types/image.type';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';

interface iTab {
    img: string;
    link: string;
}

export default function PortfolioNav() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

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
        {
            img: ImageType.PLATFORM,
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
                <img src={ImageType.BURGER} alt="Burger menu button" />
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
                        <img src={tab.img} />
                    </Link>
                ))}
            </div>

            <span></span>
        </div>
    );
}
