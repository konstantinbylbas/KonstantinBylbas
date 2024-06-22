/** @format */

import { useParams } from 'react-router-dom';
import './Generator.scss';

export default function Generator() {
    const { id } = useParams();

    console.log(id);
    

    return <div className="generator">{id ? <></> : ''}</div>;
}
