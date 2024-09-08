/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Summary.scss';
import Skills from '../skills/Skills';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import injectorService from '@app/services/injector.service';
import {
    FirebaseCollection,
    FirebaseTable,
} from '@app/types/portfolio/data.type';
import { TranslationContext } from '@app/contexts/translationContext';

export default function Summary() {
    const { contextTranslation } = useContext(TranslationContext);

    const [infoItemsList, setInfoItemsList] = useState([
        { title: 'First name', value: 'Konstantin' },
        { title: 'Last name', value: 'Bylbas' },
        { title: 'Age', value: getAge() },
        { title: 'Nationality', value: 'Ukrainian' },
    ]);

    const texts = useMemo(
        () => contextTranslation['Summary'],
        [contextTranslation],
    );

    const FirebaseService = injectorService.get('FirebaseService');

    useLayoutEffect(() => {
        fetchSummary();
    }, []);

    async function fetchSummary() {
        const data = await FirebaseService.getTableData(
            FirebaseCollection.PORTFOLIO,
            FirebaseTable.SUMMARY,
        );
        setInfoItemsList([...infoItemsList, ...data]);
    }

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
                    defaultColorText: texts.title.foregraund[0],
                    primaryColorText: texts.title.foregraund[1],
                }}
                backgroundText={texts.title.background}
            />

            <div className="personal-info" data-aos="fade-left">
                <h4 className="personal-info_title">
                    {texts.personalInfo.title}
                </h4>
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

                <h4 className="personal-info_title">{texts.skills.title}</h4>
                <Skills />
            </div>
        </section>
    );
}
