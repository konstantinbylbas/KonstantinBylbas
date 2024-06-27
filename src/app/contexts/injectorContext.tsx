/** @format */

import {
    InjectorServiceProvider,
    iInjectorServiceProvider,
} from '@app/types/injector.type';
import React, { useState } from 'react';

interface InjectorContextProviderProps {
    children: React.ReactNode;
}

interface InjectorContextType {
    contextInjector: iInjectorServiceProvider;
}

export const InjectorContext = React.createContext<InjectorContextType>({
    contextInjector: InjectorServiceProvider,
});

export default function InjectorContextProvider({
    children,
}: InjectorContextProviderProps) {
    const [contextInjector] = useState<iInjectorServiceProvider>(
        InjectorServiceProvider,
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
