/** @format */

import { useLocation } from 'react-router-dom';
import './Nav.scss';
import { useEffect, useMemo } from 'react';
import { ScreenType } from '@_types/screen.type';
import PortfolioNav from './components/portfolio/PortfolioNav';
import PlatformNav from './components/platform/PlatformNav';
import SeoJson from '../../../../../seo.json';

interface iSeoPageData {
    title: string;
    description: string;
}

export default function Nav() {
    const location = useLocation();

    const isPortfolioSection = useMemo(
        () => !location.pathname.includes(`/${ScreenType.PLATFORM}`),
        [location],
    );

    useEffect(() => {        
        metaUpdater();
    }, [location]);

    function metaUpdater(): void {
        const path = location.pathname;
        const data = getPageSeoDataFromPath(path);
        setPageSeoData(data);
    }

    function getPageSeoDataFromPath(path: string): iSeoPageData {
        if (!path) {
            return SeoJson.portfolio;
        } else {
            const [_, chapter, subChapter, page] = path.split('/');

            if (!chapter || !subChapter || !page) {
                return SeoJson.portfolio;
            }

            return (
                (SeoJson as any)[chapter]?.chapters?.[subChapter]?.[page] ||
                SeoJson.portfolio
            );
        }
    }

    function setPageSeoData(data: iSeoPageData): void {
        const { title, description } = data;

        document.title = title;

        const metaOgTitle = document.querySelector('meta[name="og:title"]');
        metaOgTitle?.setAttribute('content', title);

        const metaTwitterTitle = document.querySelector(
            'meta[name="twitter:title"]',
        );
        metaTwitterTitle?.setAttribute('content', title);

        const metaDescription = document.querySelector(
            'meta[name="description"]',
        );
        metaDescription?.setAttribute('content', description);

        const metaOgDescription = document.querySelector(
            'meta[name="og:description"]',
        );
        metaOgDescription?.setAttribute('content', description);

        const metaTwitterDescription = document.querySelector(
            'meta[name="twitter:description"]',
        );
        metaTwitterDescription?.setAttribute('content', description);
    }

    return <nav>{isPortfolioSection ? <PortfolioNav /> : <PlatformNav />}</nav>;
}
