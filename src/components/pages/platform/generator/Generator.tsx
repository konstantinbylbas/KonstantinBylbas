/** @format */

import { useHistory, useLocation, useParams } from 'react-router-dom';
import './Generator.scss';
import StringGenerator from './string/StringGenerator';
import { useLayoutEffect } from 'react';
import { GeneratorPages } from '@_types/screen.type';

export function Generator() {
    const { pathname } = useLocation();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();

    useLayoutEffect(() => {
        if (!id && !pathname.includes(GeneratorPages.STRING)) {
            history.replace(`${pathname}/${GeneratorPages.STRING}`);
        }
    }, [history, id, pathname]);

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
