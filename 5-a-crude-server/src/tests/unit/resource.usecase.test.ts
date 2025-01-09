import { ResourceEntity } from '@core/domain/resource/entities/resource.entity';
import { ResourceRepository } from '@core/domain/resource/repositories/resource.repository';
import {
    CreateResourceUseCase,
    DeleteResourceUseCase,
    GetResourceUseCase,
    ListResourcesUseCase,
    UpdateResourceUseCase,
} from '@core/usecases/resource';
import { IResourceService } from '@modules/resource/services/resource.service';
import { AppError } from '@shared/errors/app.error';
import { ErrorTypes } from '@shared/errors/error.types';

describe('Resource Use Cases', () => {
    let mockRepository: jest.Mocked<ResourceRepository>;
    let mockService: jest.Mocked<IResourceService>;
    let createUseCase: CreateResourceUseCase;
    let getUseCase: GetResourceUseCase;
    let updateUseCase: UpdateResourceUseCase;
    let deleteUseCase: DeleteResourceUseCase;
    let listUseCase: ListResourcesUseCase;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        mockService = {
            validateResourceName: jest.fn(),
            validateResource: jest.fn(),
            enrichResourceData: jest.fn(),
            validateResourceExists: jest.fn(),
        };

        createUseCase = new CreateResourceUseCase(mockRepository, mockService);
        getUseCase = new GetResourceUseCase(mockRepository, mockService);
        updateUseCase = new UpdateResourceUseCase(mockRepository, mockService);
        deleteUseCase = new DeleteResourceUseCase(mockRepository);
        listUseCase = new ListResourcesUseCase(mockRepository);
    });

    describe('CreateResourceUseCase', () => {
        it('should create a resource successfully', async () => {
            const createDTO = {
                name: 'Test Resource',
                description: 'Test Description',
            };

            const resourceEntity = new ResourceEntity(
                '1',
                createDTO.name,
                createDTO.description,
                new Date(),
                new Date(),
            );

            mockRepository.create.mockResolvedValue(resourceEntity);
            mockService.enrichResourceData.mockResolvedValue(resourceEntity);

            const result = await createUseCase.execute(createDTO);

            expect(mockService.validateResource).toHaveBeenCalled();
            expect(mockRepository.create).toHaveBeenCalledWith(resourceEntity);
            expect(result).toEqual(resourceEntity);
        });

        it('should throw error when validation fails', async () => {
            const createDTO = {
                name: 'Test',
                description: 'Test',
            };

            mockService.validateResource.mockImplementation(() => {
                throw new AppError(ErrorTypes.ValidationError, 'Validation failed');
            });

            await expect(createUseCase.execute(createDTO)).rejects.toThrow(AppError);
        });
    });

    describe('GetResourceUseCase', () => {
        it('should get a resource by id', async () => {
            const resourceEntity = new ResourceEntity(
                '1',
                'Test Resource',
                'Test Description',
                new Date(),
                new Date(),
            );

            mockRepository.findById.mockResolvedValue(resourceEntity);
            mockService.enrichResourceData.mockResolvedValue(resourceEntity);

            const result = await getUseCase.execute('1');

            expect(mockRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(resourceEntity);
        });

        it('should throw error when resource not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(getUseCase.execute('1')).rejects.toThrow(AppError);
        });
    });

    describe('UpdateResourceUseCase', () => {
        it('should update a resource successfully', async () => {
            const updateDTO = {
                name: 'Updated Resource',
                description: 'Updated Description',
            };

            const existingResource = new ResourceEntity(
                '1',
                'Old Name',
                'Old Description',
                new Date(),
                new Date(),
            );

            const updatedResource = new ResourceEntity(
                '1',
                updateDTO.name,
                updateDTO.description,
                existingResource.createdAt,
                new Date(),
            );

            mockRepository.findById.mockResolvedValue(existingResource);
            mockRepository.update.mockResolvedValue(updatedResource);
            mockService.enrichResourceData.mockResolvedValue(updatedResource);

            const result = await updateUseCase.execute('1', updateDTO);

            expect(mockService.validateResource).toHaveBeenCalled();
            expect(mockRepository.update).toHaveBeenCalledWith('1', existingResource);
            expect(result).toEqual(updatedResource);
        });

        it('should throw error when resource not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(updateUseCase.execute('1', { name: 'New Name' })).rejects.toThrow(AppError);
        });
    });

    describe('DeleteResourceUseCase', () => {
        it('should delete a resource successfully', async () => {
            const resourceId = '1';
            mockRepository.findById.mockResolvedValue(new ResourceEntity(
                resourceId,
                'Test Resource',
                'Test Description',
                new Date(),
                new Date(),
            ));

            await deleteUseCase.execute(resourceId);

            expect(mockRepository.delete).toHaveBeenCalledWith(resourceId);
        });

        it('should throw error when resource not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(deleteUseCase.execute('1')).rejects.toThrow(AppError);
        });
    });

    describe('ListResourcesUseCase', () => {
        it('should list resources with filters', async () => {
            const filters = {
                name: 'Test',
                page: 1,
                limit: 10,
            };

            const resources = [
                new ResourceEntity('1', 'Test 1', 'Desc 1', new Date(), new Date()),
                new ResourceEntity('2', 'Test 2', 'Desc 2', new Date(), new Date()),
            ];

            mockRepository.findAll.mockResolvedValue(resources);

            const result = await listUseCase.execute(filters);

            expect(mockRepository.findAll).toHaveBeenCalledWith(filters);
            expect(result).toEqual(resources);
        });

        it('should return empty array when no resources found', async () => {
            mockRepository.findAll.mockResolvedValue([]);

            const result = await listUseCase.execute({});

            expect(result).toEqual([]);
        });
    });

    // Add more test cases for other use cases...
});
