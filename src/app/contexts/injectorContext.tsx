/** @format */

import {
    iInjectorProvider,
} from '@app/types/injector.type';
import React, { useState } from 'react';

interface InjectorContextProviderProps {
    children: React.ReactNode;
}

interface InjectorContextType {
    contextInjector: iInjectorProvider;
}

export const InjectorContext = React.createContext<InjectorContextType>({
    contextInjector: {} as any,
});

export default function InjectorContextProvider({
    children,
}: InjectorContextProviderProps) {
    const [contextInjector] = useState<iInjectorProvider>(
        {} as any,
    );

    return (
        <InjectorContext.Provider
            value={{
                contextInjector,
            }}>
            {children}
        </InjectorContext.Provider>
    );
}
