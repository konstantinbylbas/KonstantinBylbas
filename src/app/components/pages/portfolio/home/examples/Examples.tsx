/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Examples.scss';

export default function Examples() {
    return (
        <section id="examples">
            <SectionTitle
                title={{
                    defaultColorText: 'My',
                    primaryColorText: 'portfolio',
                }}
                backgroundText="Works"
            />
        </section>
    );
}
