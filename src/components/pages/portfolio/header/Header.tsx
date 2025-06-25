/** @format */

import { ImageType } from '@_types/image.type';
import './Header.scss';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export default function Header() {
    const translation = useSelector(
        (state: RootState) => state.translation.translation,
    );

    const texts = useMemo(() => translation.Portfolio.header, [translation]);

    return (
        <header className="row align-items-center justify-content-between home_header">
            <div className="home_header_photo">
                <div className="home_header_photo_container">
                    <img
                        src={ImageType.AUTHOR}
                        alt="Konstantin Bylbas (Full-stack developer)"
                        title="Konstantin Bylbas"
                    />
                </div>
            </div>

            <div className="home_header_description">
                <h2>
                    <span className="text-primary">—</span>
                    <span className="text-primary">{texts.title[0]}</span>
                    <span></span>
                    <span>{texts.title[1]}</span>
                </h2>

                <p>{texts.description}</p>
            </div>
        </header>
    );
}
