/** @format */

import { useLocation } from 'react-router-dom';
import './Nav.scss';
import { useEffect, useMemo } from 'react';
import { ScreenType } from '@app/types/screen.type';
import PortfolioNav from './components/portfolio/PortfolioNav';
import PlatformNav from './components/platform/PlatformNav';

export default function Nav() {
    const location = useLocation();

    const isPortfolioSection = useMemo(
        () => !location.pathname.includes(`/${ScreenType.PLATFORM}`),
        [location],
    );

    useEffect(() => {
        const anchor = location.hash.slice(1);

        setTimeout(() => {
            if (anchor) {
                document.getElementById(anchor)?.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        }, 0);
    }, [location]);

    return <nav>{isPortfolioSection ? <PortfolioNav /> : <PlatformNav />}</nav>;
}
