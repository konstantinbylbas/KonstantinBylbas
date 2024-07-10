/** @format */

import './Home.scss';
import Header from './header/Header';
import Examples from './examples/Examples';
import Skills from './skills/Skills';
import Summary from './summary/Summary';
import Contacts from './contacts/Contacts';

export default function Home() {
    return (
        <div className="home">
            <Header />

            <div className="container">
                <Summary />

                <Skills />

                <Examples />

                <Contacts />
            </div>
        </div>
    );
}
