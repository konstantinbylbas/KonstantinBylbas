/** @format */

import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';
import Generator from '@app/components/pages/platform/generator/Generator';
import Nav from '@app/components/common/nav/Nav';
import Game from '@app/components/pages/platform/game/Game';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';

export default function Router() {
    return (
        <HashRouter>
            <Nav />

            <Routes>
                <Route path={`/${ScreenType.PORTFOLIO}`} element={<Home />} />

                <Route path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/:id?`} element={<Generator />} />

                <Route path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GAME}/:id?`} element={<Game />} />
            </Routes>
        </HashRouter>
    );
}
