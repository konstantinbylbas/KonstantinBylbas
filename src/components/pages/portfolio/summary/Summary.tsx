/** @format */

import './Summary.scss';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import injectorService from '@services/injector.service';
import { FirebaseCollection, FirebaseTable } from '@_types/portfolio/data.type';
import { TranslationContext } from '@contexts/translationContext';
import { SectionTitle } from '@components/common';

export default function Summary() {
    const { contextTranslation } = useContext(TranslationContext);

    const texts = useMemo(
        () => contextTranslation.Portfolio.summary,
        [contextTranslation],
    );

    const [infoItemsList, setInfoItemsList] = useState([
        { title: texts.personalInfo.fields['first name'], value: 'Konstantin' },
        { title: texts.personalInfo.fields['last name'], value: 'Bylbas' },
        { title: texts.personalInfo.fields['age'], value: getAge() },
        { title: texts.personalInfo.fields['nationality'], value: 'Ukrainian' },
    ]);

    const FirebaseService = injectorService.get('FirebaseService');

    useLayoutEffect(() => {
        fetchSummary();
    }, []);

    async function fetchSummary() {
        const data = await FirebaseService.getTableData(
            FirebaseCollection.PORTFOLIO,
            FirebaseTable.SUMMARY,
        );

        data.forEach(
            field =>
                (field.title =
                    texts.personalInfo.fields[field.title.toLowerCase()]),
        );

        setInfoItemsList([...infoItemsList, ...data]);
    }

    function getAge(): string {
        const startDate = new Date('2001-10-01');
        return getYearsDiffernece(startDate);
    }

    function getExpirience(): string {
        const startDate = new Date('2018-01-01');
        return getYearsDiffernece(startDate);
    }

    function getYearsDiffernece(
        dateFrom: Date,
        dateTo: Date = new Date(),
    ): string {
        let yearsDifference = dateTo.getFullYear() - dateFrom.getFullYear();

        if (
            dateTo.getMonth() < dateFrom.getMonth() ||
            (dateTo.getMonth() === dateFrom.getMonth() &&
                dateTo.getDate() < dateFrom.getDate())
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
                        <h2>{getExpirience()}+</h2>
                        <h6>{texts.personalInfo.expirience}</h6>
                    </div>
                </div>
            </div>
        </section>
    );
}
