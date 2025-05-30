/** @format */

import { useLocation } from 'react-router-dom';
import './Nav.scss';
import { useMemo } from 'react';
import { ScreenType } from '@_types/screen.type';
import PortfolioNav from './components/portfolio/PortfolioNav';
import PlatformNav from './components/platform/PlatformNav';

export default function Nav() {
    const { pathname } = useLocation();

    const isPortfolioSection = useMemo(
        () => !pathname.includes(`/${ScreenType.PLATFORM}`),
        [pathname],
    );

    return <nav>{isPortfolioSection ? <PortfolioNav /> : <PlatformNav />}</nav>;
}
