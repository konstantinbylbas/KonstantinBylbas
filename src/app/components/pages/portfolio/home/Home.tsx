/** @format */

import './Home.scss';
import Header from './header/Header';
import Examples from './examples/Examples';
import Summary from './summary/Summary';
import Contacts from './contacts/Contacts';

export default function Home() {
    return (
        <div className="home">
            <Header />

            <div className="container">
                <Summary />

                <Examples />

                <Contacts />
            </div>
        </div>
    );
}
