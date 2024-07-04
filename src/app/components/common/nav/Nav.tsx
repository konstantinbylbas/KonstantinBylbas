/** @format */

import { Link, useLocation } from 'react-router-dom';
import './Nav.scss';
import { ImageType } from '@app/types/image.type';
import texts from './Nav.text';
import { useEffect, useMemo, useState } from 'react';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';

interface iTab {
    label: string;
    link?: string;
    tabs?: iTab[];
}

export default function Nav() {
    const location = useLocation();

    const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);

    const portfolioTabs: iTab[] = [
        { label: texts.summary, link: `/${ScreenType.PORTFOLIO}#summary` },
        { label: texts.skills, link: `/${ScreenType.PORTFOLIO}#skills` },
        { label: texts.examples, link: `/${ScreenType.PORTFOLIO}#examples` },
    ];
    const platformTabs: iTab[] = [
        {
            label: texts.generatorString,
            link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/`,
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

    function updateTabs(): iTab[] {
        const appSection = location.pathname.split('/')[1] as ScreenType;

        switch (appSection) {
            case ScreenType.PORTFOLIO:
                return [
                    ...portfolioTabs,
                    { label: texts.platform, tabs: platformTabs },
                ];

            case ScreenType.PLATFORM:
                return [
                    ...platformTabs,
                    { label: texts.portfolio, tabs: portfolioTabs },
                ];
        }
    }

    return (
        <nav>
            <div className="container">
                <Link to="/" className="logo">
                    <img src={ImageType.LOGO} alt="logo" />
                </Link>

                <div className="tabs">
                    {tabs.map((tab, i) =>
                        tab.link ? (
                            <Link to={tab.link} key={`portfolio tab #${i}`}>
                                {tab.label}
                            </Link>
                        ) : tab.tabs ? (
                            <div
                                className="tabs_button"
                                onClick={() =>
                                    setIsOpenSubmenu(!isOpenSubmenu)
                                }>
                                <p>{tab.label}</p>
                                <span
                                    className={`arrow ${isOpenSubmenu ? 'active' : ''}`}></span>

                                <div
                                    className={`tabs_subTabs-menu ${isOpenSubmenu ? 'active' : ''}`}
                                    onClick={event => {
                                        event.stopPropagation();
                                    }}>
                                    {tab.tabs.map((subTab, k) =>
                                        subTab.link ? (
                                            <Link
                                                to={subTab.link}
                                                onClick={event => {
                                                    setIsOpenSubmenu( 
                                                        !isOpenSubmenu,
                                                    );
                                                }}
                                                key={`portfolio subTab #${k}`}>
                                                {subTab.label}
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
            </div>
        </nav>
    );
}
