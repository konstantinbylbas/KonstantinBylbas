/** @format */

import { iInjectorProvider } from '@_types/injector.type';

class InjectorService {
    private services: Map<
        keyof iInjectorProvider,
        iInjectorProvider[keyof iInjectorProvider]
    > = new Map();

    register<T extends keyof iInjectorProvider>(
        name: T,
        ServiceClass: new (...args: any[]) => iInjectorProvider[T],
    ): void {
        if (!this.services.has(name)) {
            const instance = new ServiceClass();
            this.services.set(name, instance);
        }
    }

    get<T extends keyof iInjectorProvider>(name: T): iInjectorProvider[T] {
        const service = this.services.get(name) as iInjectorProvider[T];
        if (!service) {
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }
}

const injectorService = new InjectorService();
export default injectorService;
