/** @format */

import { useHistory, useLocation, useParams } from 'react-router-dom';
import './Game.scss';
import { useLayoutEffect } from 'react';
import NaughtsAndCrosses from './naughts-and-crosses/NaughtsAndCrosses';

export default function Game() {
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();

    useLayoutEffect(() => {
        if (!id && !location.pathname.includes('/naughts-and-crosses')) {
            history.push(`${location.pathname}/naughts-and-crosses`);
        }
    }, [history, id, location.pathname]);

    return (
        <div className="game">
            <div className="container">
                {id === 'naughts-and-crosses' ? <NaughtsAndCrosses /> : ''}
            </div>
        </div>
    );
}
