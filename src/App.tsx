/** @format */

import './App.scss';
import { Notifications } from '@components/common';
import NaughtsAndCrosses from './services/game/naughtsAndCrosses.service';
import injectorService from './services/injector.service';
import { TelegramService } from './services/telegram.service';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FirebaseService } from './services/firebase.service';
import { TranslationService } from './services/translation.service';
import Router from '@routes/routes';

injectorService.register('NaughtsAndCrosses', NaughtsAndCrosses);
injectorService.register('TelegramService', TelegramService);
injectorService.register('FirebaseService', FirebaseService);
injectorService.register('TranslationService', TranslationService);

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
