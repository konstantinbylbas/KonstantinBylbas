/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';
import Generator from '@app/components/pages/platform/generator/Generator';

export default function Router() {
    const ROOT = process.env.PUBLIC_URL;

    return (
        <BrowserRouter basename={ROOT}>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/platform/generator/:id" element={<Generator />} />
            </Routes>
        </BrowserRouter>
    );
}
