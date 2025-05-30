/** @format */

import './SectionTitle.scss';

export function SectionTitle({
    title,
    backgroundText,
}: {
    title: { defaultColorText: string; primaryColorText: string };
    backgroundText: string;
}) {
    return (
        <div className="sectionTitle">
            <h2>
                {title.defaultColorText}{' '}
                <span className="text-primary">{title.primaryColorText}</span>
                <span className="sectionTitle_background">
                    {backgroundText}
                </span>
            </h2>
        </div>
    );
}
