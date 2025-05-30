/** @format */

import './Summary.scss';
import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import { FirebaseCollection, FirebaseTable } from '@_types/portfolio/data.type';
import { TranslationContext } from '@contexts/translationContext';
import { SectionTitle } from '@components/common';
import { FirebaseService } from '@services/firebase.service';

export default function Summary() {
    const { contextTranslation } = useContext(TranslationContext);

    const [summary, setSummary] = useState([
        { title: 'first name', value: 'Konstantin' },
        { title: 'last name', value: 'Bylbas' },
        { title: 'age', value: getAge() },
        { title: 'nationality', value: 'Ukrainian' },
    ]);

    const texts = useMemo(
        () => contextTranslation.Portfolio.summary,
        [contextTranslation],
    );
    const infoItemsList = useMemo(
        () =>
            summary.map(row => ({
                ...row,
                title: texts.personalInfo.fields[row.title.toLowerCase()],
            })),
        [texts, summary],
    );

    useLayoutEffect(() => {
        fetchSummary();
    }, []);

    async function fetchSummary() {
        const data = await FirebaseService.getTableData(
            FirebaseCollection.PORTFOLIO,
            FirebaseTable.SUMMARY,
        );

        setSummary([...infoItemsList, ...data]);
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
                        {infoItemsList.map((row, i) => (
                            <p key={`summary row#${i}`}>
                                <span className="title">{row.title}: </span>
                                <span className="value">{row.value}</span>
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
