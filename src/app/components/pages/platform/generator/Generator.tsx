/** @format */

import { useHistory, useLocation, useParams } from 'react-router-dom';
import './Generator.scss';
import StringGenerator from './string/StringGenerator';
import { useLayoutEffect } from 'react';

export default function Generator() {
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();

    useLayoutEffect(() => {
        if (!id && !location.pathname.includes('/string')) {
            history.push(`${location.pathname}/string`);
        }
    }, [history, id, location.pathname]);

    return (
        <div className="generator">
            {id ? (
                <div className="container">
                    {id === 'string' ? <StringGenerator /> : ''}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
