/** @format */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function AutoScroll() {
    const { hash } = useLocation();

    useEffect(() => {
        const anchor = hash.slice(1);

        setTimeout(() => {
            if (anchor) {
                document.getElementById(anchor)?.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        }, 0);
    }, [hash]);

    return <></>;
}
