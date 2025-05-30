/** @format */

import { ScreenPlatformPath, ScreenType } from '@_types/screen.type';
import { AutoScroll, Layout } from '@components/common';
import { Home, Game, Generator, NotFound } from '@components/pages';
import { HashRouter, Route, Switch } from 'react-router-dom';

export default function Router() {
    return (
        <HashRouter hashType="hashbang">
            <AutoScroll />

            <Layout>
                <Switch>
                    <Route exact path={`/${ScreenType.PORTFOLIO}`} component={Home} />

                    <Route
                        path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GENERATOR}/:id?`}
                        component={Generator}
                    />

                    <Route
                        path={`/${ScreenType.PLATFORM}/${ScreenPlatformPath.GAME}/:id?`}
                        component={Game}
                    />

                    <Route path="*" component={NotFound} />
                </Switch>
            </Layout>
        </HashRouter>
    );
}
