/** @format */

import './StringGenerator.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Input, InputRange, Checkbox } from '@components/controls';
import { NotificationType } from '@_types/notification.type';
import { NotificationContext } from '@contexts/notificationContext';
import { ButtonSize } from '@_types/button.type';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export default function StringGenerator() {
    const { contextNotification, setContextNotification } =
        useContext(NotificationContext);

    const [generatedString, setGeneratedString] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [length, setLength] = useState(20);
    const [checkboxes, setCheckboxes] = useState({
        allowSpecials: false,
        allowNumbers: false,
        allowUppercase: false,
        excludeDuplication: false,
    });

    const translation = useSelector(
        (state: RootState) => state.translation.translation,
    );

    const texts = useMemo(() => translation.Generators.string, [translation]);

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    const historyLength = 10;
    const localStorageKey = 'StringGeneratorHistory';

    const handleCheckboxChange = (key: string) => (value: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        const history = getHistoryFromStorage();
        setHistory(history);
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

            const newHistory = squeezeFromArray(history, newString);

            setHistory(newHistory);
            setHistoryToStorage(newHistory);
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
                const message = texts.error;
                setContextNotification([
                    ...contextNotification,
                    {
                        type: NotificationType.ERROR,
                        message,
                    },
                ]);
                throw message;
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

    function copyToClipboard(value: string): void {
        if (!value) {
            return;
        }

        navigator.clipboard.writeText(value);

        setContextNotification([
            ...contextNotification,
            {
                type: NotificationType.INFO,
                message: texts.copied,
            },
        ]);
    }

    function getHistoryFromStorage(): string[] {
        const storageData = localStorage.getItem(localStorageKey);

        if (!storageData) {
            return [];
        }

        const storageHistory = JSON.parse(storageData);

        if (!Array.isArray(storageHistory) || !storageHistory.length) {
            return [];
        }

        return storageHistory;
    }

    function setHistoryToStorage(history: string[]): void {
        if (!history.length) {
            return;
        }

        const formattedHistory = JSON.stringify(history);
        localStorage.setItem(localStorageKey, formattedHistory);
    }

    function squeezeFromArray(history: string[], newValue: string): string[] {
        const newHistory = history;

        if (newHistory.length >= historyLength) {
            history.shift();
        }

        history.push(newValue);
        return history;
    }

    return (
        <div className="stringGenerator">
            <div className="row row_controls">
                <Input
                    isReadOnly={true}
                    value={generatedString}
                    onFocus={() => copyToClipboard(generatedString)}
                />

                <Button
                    size={ButtonSize.SMALL}
                    label={texts.button}
                    handlerClick={generate}
                />
            </div>

            <div className="row row_range">
                <InputRange value={length} onChange={setLength} />

                <span>{length}</span>
            </div>

            <div className="row row_filter-history">
                <div className="filter column">
                    {Object.keys(checkboxes).map((key, i) => (
                        <Checkbox
                            key={i}
                            id={'stringGenerator checkbox ' + i}
                            label={texts.options[key as keyof typeof texts]}
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
                            <h5>{texts.history}</h5>
                            {history.map((string, i) => (
                                <p
                                    className="mt-2 history_row"
                                    onClick={() => copyToClipboard(string)}
                                    title={texts.copy}
                                    key={i}>
                                    {string}
                                </p>
                            ))}
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}
