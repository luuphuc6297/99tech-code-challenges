import {
    CreateResourceUseCase,
    DeleteResourceUseCase,
    GetResourceUseCase,
    ListResourcesUseCase,
    UpdateResourceUseCase,
} from '@core/usecases/resource';
import { MongoDBResourceRepository } from '@infrastructure/repositories/mongodb.resource.repository';
import { ResourceController } from '@modules/resource/controllers/resource.controller';
import { ResourceService } from '@modules/resource/services/resource.service';
import { Container } from 'typedi';

export const setupResourceContainer = (): void => {
    // Services
    Container.set('ResourceService', new ResourceService());
    Container.set(
        'ResourceRepository',
        new MongoDBResourceRepository(Container.get('RedisService')),
    );

    // Use Cases
    Container.set(
        'CreateResourceUseCase',
        new CreateResourceUseCase(
            Container.get('ResourceRepository'),
            Container.get('ResourceService'),
        ),
    );
    Container.set(
        'GetResourceUseCase',
        new GetResourceUseCase(
            Container.get('ResourceRepository'),
            Container.get('ResourceService'),
        ),
    );
    Container.set(
        'UpdateResourceUseCase',
        new UpdateResourceUseCase(
            Container.get('ResourceRepository'),
            Container.get('ResourceService'),
        ),
    );
    Container.set(
        'DeleteResourceUseCase',
        new DeleteResourceUseCase(Container.get('ResourceRepository')),
    );
    Container.set(
        'ListResourcesUseCase',
        new ListResourcesUseCase(Container.get('ResourceRepository')),
    );

    // Controller
    Container.set(
        'ResourceController',
        new ResourceController(
            Container.get('CreateResourceUseCase'),
            Container.get('GetResourceUseCase'),
            Container.get('UpdateResourceUseCase'),
            Container.get('DeleteResourceUseCase'),
            Container.get('ListResourcesUseCase'),
        ),
    );
};
