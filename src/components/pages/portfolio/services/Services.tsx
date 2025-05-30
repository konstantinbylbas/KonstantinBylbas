/** @format */

import { useContext, useMemo } from 'react';
import './Services.scss';
import { TranslationContext } from '@contexts/translationContext';

interface Service {
    title: string;
    description: string;
}

export default function Services() {
    const { contextTranslation } = useContext(TranslationContext);

    const texts = useMemo(
        () => contextTranslation.Portfolio.summary.services,
        [contextTranslation],
    );

    const services: Service[] = useMemo(
        () => Object.values(texts.list),
        [texts],
    );

    return (
        <section className="services">
            <h4 className="services_title">{texts.title}</h4>
            <div className="services_body">
                {services.map((service, i) => (
                    <div
                        className="services_body_service"
                        key={`service #${i}`}>
                        <h5>{service.title}</h5>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
