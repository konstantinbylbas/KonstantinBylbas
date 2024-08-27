/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Skills.scss';
import ProgressBar from '@app/components/controls/progress-bar/ProgressBar';
import { useState } from 'react';
import texts from './Skills.text';
import Button from '@app/components/controls/button/Button';

interface iSkill {
    title: string;
    value: number;
}

export default function Skills() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const skillsToShowLength = window.innerWidth > 550 ? 8 : 4;
    const skillsData: iSkill[] = [
        { title: 'HTML', value: 90 },
        { title: 'SCSS', value: 90 },
        { title: 'Angular.js', value: 75 },
        { title: 'React.js', value: 75 },
        { title: 'React Native', value: 55 },
        { title: 'TypeScript', value: 80 },
        { title: 'Node.js', value: 70 },
        { title: 'PHP', value: 40 },
        { title: 'Next.js', value: 35 },
        { title: 'C++', value: 20 },
        { title: 'WordPress', value: 30 },
        { title: 'Docker', value: 20 },
        { title: 'Prisma', value: 25 },
        { title: 'Git', value: 78 },
        { title: '.NET', value: 30 },
        { title: 'Photoshop', value: 27 },
        { title: 'Figma', value: 34 },
        { title: 'Illustrator', value: 40 },
    ];
    const [skills, setSkills] = useState<iSkill[]>(
        sortByProgress(sliceData(skillsData, skillsToShowLength)),
    );

    function sortByProgress(data: iSkill[]): iSkill[] {
        return data.sort((a, b) => b.value - a.value);
    }

    function sliceData(data: iSkill[], length: number): iSkill[] {
        return skillsData.slice(0, length);
    }

    function toggleMenu(): void {
        setIsOpenMenu(!isOpenMenu);

        const tmpSkills = sortByProgress(skillsData);

        if (isOpenMenu) {
            setTimeout(() => {
                setSkills(sliceData(tmpSkills, skillsToShowLength));
            }, 300);
        } else {
            setSkills(sliceData(tmpSkills, skillsData.length));
        }
    }

    return (
        <section id="skills">
            <SectionTitle
                title={{
                    defaultColorText: 'My',
                    primaryColorText: 'skills',
                }}
                backgroundText="Expirience"
            />

            <div className={`skills-line ${isOpenMenu ? 'open' : ''}`}>
                {skills.length &&
                    skills.map(skill => (
                        <div className="skills-line_block" key={skill.title}>
                            <ProgressBar value={skill.value} />
                            <p>{skill.title}</p>
                        </div>
                    ))}
            </div>

            {skills.length >= skillsToShowLength ? (
                <div className="openSkillsMenuButton">
                    <Button
                        label={isOpenMenu ? texts.closeMenu : texts.openMenu}
                        handlerClick={toggleMenu}
                    />
                </div>
            ) : (
                ''
            )}
        </section>
    );
}
