/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Skills.scss';

export default function Skills() {
    return (
        <section id="skills">
            <SectionTitle
                title={{
                    defaultColorText: 'My',
                    primaryColorText: 'skills',
                }}
                backgroundText="Expirience"
            />
            <div data-aos="fade-left"></div>
        </section>
    );
}
