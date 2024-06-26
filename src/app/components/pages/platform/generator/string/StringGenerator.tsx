/** @format */

import Input from '@app/components/controls/input/Input';
import './StringGenerator.scss';
import { useEffect, useState } from 'react';
import Button from '@app/components/controls/button/Button';
import Checkbox from '@app/components/controls/checkbox/Checkbox';
import texts from './StringGenerator.text';
import InputRange from '@app/components/controls/input-range/InputRange';

export default function StringGenerator() {
    const [generatedString, setGeneratedString] = useState('');
    const [history, setHistory] = useState([]);
    const [length, setLength] = useState(20);
    const [checkboxes, setCheckboxes] = useState({
        allowSpecials: false,
        allowNumbers: false,
        allowUppercase: false,
        excludeDuplication: false,
    });

    const handleCheckboxChange = (key: string) => (value: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        setHistory([]);
    }, []);

    function generate(): void {
        const {
            allowSpecials,
            allowNumbers,
            allowUppercase,
            excludeDuplication,
        } = checkboxes;

        try {
            const newString = generateString(length, {
                allowSpecials,
                allowNumbers,
                allowUppercase,
                excludeDuplication,
            });

            setGeneratedString(newString);
            setHistory([]);
        } catch (error: any) {
            console.error('String generation error: ', error);
        }
    }

    function generateString(
        length: number,
        options: {
            allowSpecials?: boolean;
            allowNumbers?: boolean;
            allowUppercase?: boolean;
            excludeDuplication?: boolean;
        },
    ): string {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

        let characters = lowercase;
        let result = '';

        if (options.allowSpecials) {
            characters += specialChars;
        }

        if (options.allowNumbers) {
            characters += numbers;
        }

        if (options.allowUppercase) {
            characters += lowercase.toUpperCase();
        }

        const generate = () =>
            characters[Math.floor(Math.random() * characters.length)];

        if (options.excludeDuplication) {
            if (characters.length < length) {
                throw 'Not enough unique characters to generate the desired length';
            }

            while (result.length < length) {
                let char = generate();
                if (!result.includes(char)) {
                    result += char;
                }
            }
        } else {
            while (result.length < length) {
                result += generate();
            }
        }

        return result;
    }

    return (
        <div className="stringGenerator">
            <div className="container">
                <div className="row">
                    <Input value={generatedString} />

                    <Button label="Generate" handlerClick={generate} />
                </div>

                <div className='row row_range'>
                    <InputRange value={length} onChange={setLength} />

                    <span>{length}</span>
                </div>

                <div className="row">
                    <div className="filter column">
                        {Object.keys(checkboxes).map((key, i) => (
                            <Checkbox
                                key={i}
                                id={'stringGenerator checkbox ' + i}
                                label={texts[key as keyof typeof texts]}
                                isChecked={
                                    checkboxes[key as keyof typeof checkboxes]
                                }
                                onClick={handleCheckboxChange(key)}
                            />
                        ))}
                    </div>

                    <div className="history">
                        {history.length ? (
                            <>
                                <h5>History</h5>
                                {history.map((string, index) => (
                                    <p key={index}>{string}</p>
                                ))}
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
