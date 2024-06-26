/** @format */

import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';
import Generator from '@app/components/pages/platform/generator/Generator';

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/platform/generator/:id" element={<Generator />} />
            </Routes>
        </HashRouter>
    );
}
