/** @format */

import './App.scss';
import Footer from './components/common/footer/Footer';
import Notifications from './components/common/notifications/Notifications';
import NaughtsAndCrosses from './services/game/naughtsAndCrosses.service';
import injectorService from './services/injector.service';
import Router from './services/navigation.service';
import { TelegramService } from './services/telegram.service';

injectorService.register('NaughtsAndCrosses', NaughtsAndCrosses);
injectorService.register('TelegramService', TelegramService);

export default function App() {
    return (
        <div className="app">
            <main>
                <Router />
            </main>

            <Notifications />

            <Footer />
        </div>
    );
}
