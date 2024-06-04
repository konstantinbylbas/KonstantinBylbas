/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/pages/portfolio/home/Home';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/platform/:id" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
