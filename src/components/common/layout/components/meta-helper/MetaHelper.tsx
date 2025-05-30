/** @format */

import { useEffect } from 'react';
import SeoJson from '../../../../../seo.json';
import { useLocation } from 'react-router-dom';

interface iSeoPageData {
    title: string;
    description: string;
}

export default function MetaHelper() {
    const { pathname } = useLocation();

    useEffect(() => {
        metaUpdater();
    }, [pathname]);

    function metaUpdater(): void {
        const path = pathname;
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

    return <></>;
}
