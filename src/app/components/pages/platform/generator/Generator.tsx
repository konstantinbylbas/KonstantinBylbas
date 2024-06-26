/** @format */

import { useParams } from 'react-router-dom';
import './Generator.scss';
import StringGenerator from './string/StringGenerator';

export default function Generator() {
    const { id } = useParams();

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
