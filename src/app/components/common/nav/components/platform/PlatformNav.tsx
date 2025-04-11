/** @format */

import LanguageSelector from '@app/components/common/language-selector/LanguageSelector';
import './PlatformNav.scss';
import { useContext, useMemo, useState } from 'react';
import { TranslationContext } from '@app/contexts/translationContext';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';
import { IconType } from '@app/types/image.type';
import { LanguageListAlign } from '@app/types/language.type';
import { Link, useLocation } from 'react-router-dom';

export interface iTab {
    title: string;
    subTabs: { title: string; link: string }[];
}

export default function PlatformNav() {
    const { contextTranslation } = useContext(TranslationContext);

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [activeTab, setActiveTab] = useState<iTab | undefined>();

    const texts = useMemo(
        () => contextTranslation.Nav.tabs,
        [contextTranslation],
    );

    const location = useLocation();

    const platformTabs: iTab[] = [
        {
            title: texts.games.title,
            subTabs: [
                {
                    title: texts.games['tic-tac-toe'],
                    link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GAME}/naughts-and-crosses`,
                },
            ],
        },
        {
            title: texts.generators.title,
            subTabs: [
                {
                    title: texts.generators.string,
                    link: `/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/string`,
                },
            ],
        },
    ];

    function handlerOpen(tab: iTab): void {
        const activeTabValue =
            activeTab && activeTab.title === tab.title ? undefined : tab;

        setActiveTab(activeTabValue);
    }

    return (
        <div className="platformNav">
            <div
                className="burger"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                data-testid="burger">
                <img src={IconType.BURGER} alt="Burger menu button" />
            </div>

            <div
                className={`platformNav_container ${isOpenMenu ? 'open' : ''}`}>
                <div className="platformNav_container_tabs">
                    {platformTabs.length
                        ? platformTabs.map((tab, i) => (
                              <div
                                  className={`platformNav_container_tabs_tab ${activeTab && activeTab.title === tab.title ? 'open' : ''}`}
                                  key={`platformNav tab ${tab.title}`}
                                  data-testid={`platform-tab-${i}`}>
                                  <p
                                      className="platformNav_container_tabs_tab_title"
                                      onClick={() => handlerOpen(tab)}>
                                      <span>{tab.title}</span>
                                      <span className="arrow"></span>
                                  </p>
                                  <div className="platformNav_container_tabs_tab_body">
                                      {tab.subTabs.map((subTab, j) => (
                                          <Link
                                              to={subTab.link}
                                              className={`platformNav_container_tabs_tab_body_subTab ${location.pathname === subTab.link ? 'active' : ''}`}
                                              key={`platformNav tab ${tab.title} subTab ${subTab.title}`}
                                              onClick={() =>
                                                  setIsOpenMenu(false)
                                              }
                                              data-testid={`platform-tab-${i}_subtab-${j}`}>
                                              {subTab.title}
                                          </Link>
                                      ))}
                                  </div>
                              </div>
                          ))
                        : ''}
                </div>

                <LanguageSelector align={LanguageListAlign.TOP} />
            </div>
        </div>
    );
}
