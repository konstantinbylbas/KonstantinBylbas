/** @format */

import { useEffect, useRef } from 'react';
import './ProgressBar.scss';

export function ProgressBar({ value }: { value: number }) {
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!progressBarRef.current) {
                return;
            }

            const { top, bottom } =
                progressBarRef.current.getBoundingClientRect();
            const inViewport = top + 50 < window.innerHeight && bottom >= 0;

            if (inViewport) {
                progressBarRef.current.style.setProperty(
                    '--progress-value',
                    `${value}%`,
                );
            } else {
                progressBarRef.current.style.setProperty(
                    '--progress-value',
                    `0%`,
                );
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [value]);

    return (
        <div
            className="progress-bar"
            ref={progressBarRef}
            style={{ '--progress-value': '0%' } as React.CSSProperties}></div>
    );
}
