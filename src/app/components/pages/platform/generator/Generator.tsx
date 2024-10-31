/** @format */

import { useNavigate, useParams } from 'react-router-dom';
import './Generator.scss';
import StringGenerator from './string/StringGenerator';
import { useLayoutEffect } from 'react';

export default function Generator() {
    const navigation = useNavigate();
    const { id } = useParams();

    useLayoutEffect(() => {
        if (!id) {
            navigation('./string');
        }
    }, [navigation, id]);

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
