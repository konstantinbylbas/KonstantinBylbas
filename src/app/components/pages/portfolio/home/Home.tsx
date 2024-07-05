/** @format */

import { ImageType } from '@app/types/image.type';
import './Home.scss';

export default function Home() {
    return (
        <div className="home">
            <header className="row align-items-center justify-content-between">
                <div className="home_header_photo">
                    <img src={ImageType.AUTHOR} alt="author" />
                </div>

                <div className="home_header_description">
                    <h2>
                        <span className="text-primary">—</span>
                        <span className="text-primary">
                            I'm Konstantin Bylbas
                        </span>
                        <span></span>
                        <span>Full-stack developer</span>
                    </h2>

                    <p>
                        I am a Full-stack developer with a great enthusiasm for
                        creating innovative and efficient web applications. I
                        have extensive experience with a variety of technologies
                        and tools and I am able to efficiently implement
                        projects of any scale.
                    </p>
                </div>
            </header>

            <section id="summary">
                <h2>
                    About <span className="text-primary">me</span>
                    <span className="section_header_background">Resume</span>
                </h2>
            </section>

            <section id="skills">
                <h2>
                    My <span className="text-primary">skills</span>
                    <span className="section_header_background">
                        Expirience
                    </span>
                </h2>
            </section>

            <section id="examples">
                <h2>
                    My <span className="text-primary">portfolio</span>
                    <span className="section_header_background">Works</span>
                </h2>
            </section>
        </div>
    );
}
