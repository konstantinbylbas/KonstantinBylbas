/** @format */

import './Skills.scss';
import ProgressBar from '@app/components/controls/progress-bar/ProgressBar';
import { useLayoutEffect, useState } from 'react';
import texts from './Skills.text';
import Button from '@app/components/controls/button/Button';
import injectorService from '@app/services/injector.service';
import {
    FirebaseCollection,
    FirebaseTable,
} from '@app/types/portfolio/data.type';

interface iSkill {
    title: string;
    value: number;
}

export default function Skills() {
    const [dbData, setDbData] = useState<iSkill[]>([]);
    const [skills, setSkills] = useState<iSkill[]>([]);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const FirebaseService = injectorService.get('FirebaseService');

    const skillsToShowLength = window.innerWidth > 550 ? 8 : 4;

    useLayoutEffect(() => {
        fetchSkills();
    }, []);

    useLayoutEffect(() => {
        if (!dbData?.length) {
            return;
        }

        setSkills(sliceData(sortByProgress(dbData), skillsToShowLength));
    }, [dbData]);

    async function fetchSkills() {
        const data = await FirebaseService.getTableData(
            FirebaseCollection.PORTFOLIO,
            FirebaseTable.SKILLS,
        );
        setDbData(data);
    }

    function sortByProgress(data: iSkill[]): iSkill[] {
        return data.sort((a, b) => b.value - a.value);
    }

    function sliceData(data: iSkill[], length: number): iSkill[] {
        return data.slice(0, length);
    }

    function toggleMenu(): void {
        setIsOpenMenu(!isOpenMenu);

        const tmpSkills = sortByProgress(dbData);

        if (isOpenMenu) {
            setTimeout(() => {
                setSkills(sliceData(tmpSkills, skillsToShowLength));
            }, 300);
        } else {
            setSkills(sliceData(tmpSkills, dbData.length));
        }
    }

    return (
        <div className="skills">
            <div className={`skills-line ${isOpenMenu ? 'open' : ''}`}>
                {skills.length
                    ? skills.map(skill => (
                          <div className="skills-line_block" key={skill.title}>
                              <ProgressBar value={skill.value} />
                              <p>{skill.title}</p>
                          </div>
                      ))
                    : ''}
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
        </div>
    );
}
