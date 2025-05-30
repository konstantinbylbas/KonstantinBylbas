/** @format */

import { Link } from 'react-router-dom';
import './Footer.scss';
import texts from './Footer.text';
import { ScreenType } from '@_types/screen.type';
import { SocialMediaLinks } from '@components/common/index';

export default function Footer() {
    return (
        <footer>
            <div className="container row align-items-center justify-content-between">
                <Link
                    to={`/${ScreenType.PORTFOLIO}`}
                    className="name"
                    data-testid="footer-name">
                    {texts.name}
                </Link>

                <SocialMediaLinks />
            </div>
        </footer>
    );
}
