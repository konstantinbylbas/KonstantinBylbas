/** @format */

import { useParams } from 'react-router-dom';
import './Generator.scss';

export default function Generator() {
    const { id } = useParams();

    return <div className="generator">{id ? <></> : ''}</div>;
}
