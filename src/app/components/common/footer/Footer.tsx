/** @format */

import SocialMediaLinks from '../socialMedia-links/SocialMediaLinks';
import './Footer.scss';
import texts from './Footer.text';

export default function Footer() {
    return (
        <footer>
            <div className="container row align-items-center justify-content-between">
                <div className="name">{texts.name}</div>

                <SocialMediaLinks />
            </div>
        </footer>
    );
}
