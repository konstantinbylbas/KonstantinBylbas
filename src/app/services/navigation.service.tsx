/** @format */

import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';
import Generator from '@app/components/pages/platform/generator/Generator';
import Nav from '@app/components/common/nav/Nav';

export default function Router() {
    return (
        <HashRouter>
            <Nav />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/platform/generator/:id?" element={<Generator />} />
            </Routes>
        </HashRouter>
    );
}
