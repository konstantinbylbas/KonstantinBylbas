/** @format */

import './Home.scss';
import Header from './header/Header';
import Summary from './summary/Summary';
import Skills from './skills/Skills';
import Services from './services/Services';
import Examples from './examples/Examples';
import Contacts from './contacts/Contacts';

export function Home() {
    return (
        <div className="home">
            <Header />

            <div className="container">
                <Summary />

                <Skills />

                <Services />

                <Examples />

                <Contacts />
            </div>
        </div>
    );
}
