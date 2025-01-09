import { setupInfrastructureContainer } from './infrastructure.container';
import { setupResourceContainer } from './resource.container';

export const setupContainer = (): void => {
    // Setup infrastructure first
    setupInfrastructureContainer();

    // Setup domain modules
    setupResourceContainer();
};
