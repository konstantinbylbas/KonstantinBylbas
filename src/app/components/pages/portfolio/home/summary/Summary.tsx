/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Summary.scss';

export default function Summary() {
    return (
        <section id="summary">
            <SectionTitle
                title={{
                    defaultColorText: 'About',
                    primaryColorText: 'me',
                }}
                backgroundText="Resume"
            />
        </section>
    );
}
