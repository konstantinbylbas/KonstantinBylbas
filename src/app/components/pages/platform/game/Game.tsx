/** @format */

import { useNavigate, useParams } from 'react-router-dom';
import './Game.scss';
import { useLayoutEffect } from 'react';
import NaughtsAndCrosses from './naughts-and-crosses/NaughtsAndCrosses';

export default function Game() {
    const navigation = useNavigate();
    const { id } = useParams();

    useLayoutEffect(() => {
        if (!id) {
            navigation('./naughts-and-crosses');
        }
    }, [id]);

    return <div className="game">
        <div className="container">
            {id === 'naughts-and-crosses' ? <NaughtsAndCrosses /> : ''}
        </div>
    </div>;
}
