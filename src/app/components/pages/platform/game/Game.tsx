/** @format */

import { useHistory, useLocation, useParams } from 'react-router-dom';
import './Game.scss';
import { useLayoutEffect } from 'react';
import NaughtsAndCrosses from './naughts-and-crosses/NaughtsAndCrosses';
import { GamePages } from '@app/types/screen.type';

export default function Game() {
    const location = useLocation();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();

    useLayoutEffect(() => {
        if (!id && !location.pathname.includes(GamePages.NAUGHTS_AND_CROSSES)) {
            history.replace(`${location.pathname}/${GamePages.NAUGHTS_AND_CROSSES}`);
        }
    }, [history, id, location.pathname]);

    return (
        <div className="game">
            <div className="container">
                {id === GamePages.NAUGHTS_AND_CROSSES ? <NaughtsAndCrosses /> : ''}
            </div>
        </div>
    );
}
