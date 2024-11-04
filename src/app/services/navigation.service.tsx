/** @format */

import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';
import Generator from '@app/components/pages/platform/generator/Generator';
import Nav from '@app/components/common/nav/Nav';
import Game from '@app/components/pages/platform/game/Game';
import { ScreenPlatformPath, ScreenType } from '@app/types/screen.type';
import Footer from '@app/components/common/footer/Footer';

export default function Router() {
    return (
        <HashRouter hashType="hashbang">
            <Nav />

            <Switch>
                <Route exact path={`/${ScreenType.PORTFOLIO}`} component={Home} />

                <Route path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/:id?`} component={Generator} />

                <Route path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GAME}/:id?`} component={Game} />
            </Switch>

            <Footer />
        </HashRouter>
    );
}
