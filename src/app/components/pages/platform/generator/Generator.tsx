/** @format */

import { useHistory, useLocation, useParams } from 'react-router-dom';
import './Generator.scss';
import StringGenerator from './string/StringGenerator';
import { useLayoutEffect } from 'react';
import { GeneratorPages } from '@app/types/screen.type';

export default function Generator() {
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();

    useLayoutEffect(() => {
        if (!id && !location.pathname.includes(GeneratorPages.STRING)) {
            history.push(`${location.pathname}/${GeneratorPages.STRING}`);
        }
    }, [history, id, location.pathname]);

    return (
        <div className="generator">
            {id ? (
                <div className="container">
                    {id === GeneratorPages.STRING ? <StringGenerator /> : ''}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
