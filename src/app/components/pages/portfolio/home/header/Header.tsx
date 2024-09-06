/** @format */

import { ImageType } from '@app/types/image.type';
import './Header.scss';
import { TranslationContext } from '@app/contexts/translationContext';
import { useContext, useMemo } from 'react';

export default function Header() {
    const { contextTranslation } = useContext(TranslationContext);

    const texts = useMemo(() => contextTranslation['Header'], [contextTranslation]);

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
