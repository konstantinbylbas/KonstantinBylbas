/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Summary.scss';
import Skills from '../skills/Skills';

export default function Summary() {
    const infoItemsList: { title: string; value: string }[] = [
        { title: 'First name', value: 'Konstantin' },
        { title: 'Last name', value: 'Bylbas' },
        { title: 'Age', value: getAge() },
        { title: 'Nationality', value: 'Ukrainian' },
        { title: 'Address', value: 'Dnipro' },
        { title: 'Languages', value: 'English, Ukrainian' },
    ];

    function getAge(): string {
        const startDate = new Date('2001-10-01');
        const today = new Date();

        let yearsDifference = today.getFullYear() - startDate.getFullYear();

        if (
            today.getMonth() < startDate.getMonth() ||
            (today.getMonth() === startDate.getMonth() &&
                today.getDate() < startDate.getDate())
        ) {
            yearsDifference--;
        }

        return yearsDifference.toString();
    }

    return (
        <section id="summary">
            <SectionTitle
                title={{
                    defaultColorText: 'About',
                    primaryColorText: 'me',
                }}
                backgroundText="Resume"
            />

            <div className="personal-info" data-aos="fade-left">
                <h4 className="personal-info_title">Personal info</h4>
                <div className="personal-info_row">
                    <div>
                        {infoItemsList.map(item => (
                            <p key={item.title}>
                                <span className="title">{item.title}: </span>
                                <span className="value">{item.value}</span>
                            </p>
                        ))}
                    </div>

                    <div>
                        <h2>7</h2>
                        <h6>years of expirience</h6>
                    </div>
                </div>

                <h4 className="personal-info_title">Skills</h4>
                <Skills />
            </div>
        </section>
    );
}
