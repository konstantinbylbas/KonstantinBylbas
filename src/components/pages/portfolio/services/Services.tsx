/** @format */

import { useMemo } from 'react';
import './Services.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

interface Service {
    title: string;
    description: string;
}

export default function Services() {
    const translation = useSelector(
        (state: RootState) => state.translation.translation,
    );

    const texts = useMemo(
        () => translation.Portfolio.summary.services,
        [translation],
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
