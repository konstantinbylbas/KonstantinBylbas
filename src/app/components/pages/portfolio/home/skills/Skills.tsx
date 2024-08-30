/** @format */

import SectionTitle from '@app/components/common/section-title/SectionTitle';
import './Skills.scss';
import ProgressBar from '@app/components/controls/progress-bar/ProgressBar';
import { useLayoutEffect, useState } from 'react';
import texts from './Skills.text';
import Button from '@app/components/controls/button/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@app/firebaseConfig';

interface iSkill {
    title: string;
    value: number;
}

export default function Skills() {
    const [dbData, setDbData] = useState<iSkill[]>([]);
    const [skills, setSkills] = useState<iSkill[]>([]);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

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
        const skillsRef = doc(db, 'portfolio', 'skills');

        try {
            const docSnap = await getDoc(skillsRef);

            if (!docSnap.exists()) {
                throw 'No such document';
            }

            const dbData = docSnap.data();

            if (dbData?.data) {
                setDbData(dbData.data);
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }
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
