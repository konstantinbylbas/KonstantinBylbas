/** @format */

import './App.scss';
import Footer from './components/common/footer/Footer';
import Notifications from './components/common/notifications/Notifications';
import Router from './services/navigation.service';

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
