/** @format */

import './App.scss';
import { Notifications } from '@components/common';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Router from '@routes/routes';

export default function App() {
    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className="app">
            <main>
                <Router />
            </main>

            <Notifications />
        </div>
    );
}
