/** @format */

import { ImageType } from '@app/types/image.type';
import './Header.scss';

export default function Header() {
    return (
        <header className="row align-items-center justify-content-between home_header">
            <div className="home_header_photo">
                <div className="home_header_photo_container">
                    <img src={ImageType.AUTHOR} alt="author" loading="lazy" />
                </div>
            </div>

            <div className="home_header_description">
                <h2>
                    <span className="text-primary">—</span>
                    <span className="text-primary">I'm Konstantin Bylbas</span>
                    <span></span>
                    <span>Full-stack developer</span>
                </h2>

                <p>
                    I am a Full-stack developer with a great enthusiasm for
                    creating innovative and efficient web applications. I have
                    extensive experience with a variety of technologies and
                    tools and I am able to efficiently implement projects of any
                    scale.
                </p>
            </div>
        </header>
    );
}
