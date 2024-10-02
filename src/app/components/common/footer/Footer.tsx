/** @format */

import { Link } from 'react-router-dom';
import SocialMediaLinks from '../socialMedia-links/SocialMediaLinks';
import './Footer.scss';
import texts from './Footer.text';
import { ScreenType } from '@app/types/screen.type';

export default function Footer() {
    return (
        <footer>
            <div className="container row align-items-center justify-content-between">
                <Link to={`/${ScreenType.PORTFOLIO}`} className="name">
                    {texts.name}
                </Link>

                <SocialMediaLinks />
            </div>
        </footer>
    );
}
