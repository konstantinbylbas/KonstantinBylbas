/** @format */

import injectorService from '@services/injector.service';
import React, { useState } from 'react';

interface TranslationContextProviderProps {
    children: React.ReactNode;
}

interface TranslationContextType {
    contextTranslation: any;
    setContextTranslation: React.Dispatch<React.SetStateAction<{}>>;
}

export const TranslationContext = React.createContext<TranslationContextType>({
    contextTranslation: {},
    setContextTranslation: () => {},
});

export default function TranslationContextProvider({
    children,
}: TranslationContextProviderProps) {
    const TranslationService = injectorService.get('TranslationService');

    const [contextTranslation, setContextTranslation] = useState<{}>(
        TranslationService.translation,
    );

    return (
        <TranslationContext.Provider
            value={{
                contextTranslation,
                setContextTranslation,
            }}>
            {children}
        </TranslationContext.Provider>
    );
}
