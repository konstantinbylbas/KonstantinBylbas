/** @format */

import { Link } from 'react-router-dom';
import './Nav.scss';
import { ImageType } from '@app/types/image.type';
import texts from './Nav.text';

interface iTab {
    label: string;
    link: string;
}

export default function Nav() {
    const tabs: iTab[] = [
        { label: texts.summary, link: '/#summary' },
        { label: texts.skills, link: '/#skills' },
        { label: texts.examples, link: '/#examples' },
        { label: texts.platform, link: '/platform/generator/' },
    ];

    return (
        <nav>
            <div className="container">
                <Link to="/" className="logo">
                    <img src={ImageType.LOGO} alt="logo" />
                </Link>

                <div className="tabs">
                    {tabs.map((tab, i) => (
                        <Link to={tab.link} key={`portfolio tab #${i}`}>
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
