import { ResourceController } from '@modules/resource/controllers/resource.controller';
import { validateResource } from '@modules/resource/validators/resource.validator';
import { Router } from 'express';
import { authenticate, authorize } from '@shared/middlewares/auth.middleware';

/**
 * @swagger
 * /api/v1/resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResourceDTO'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Validation error
 */
export const resourceRouter = (controller: ResourceController): Router => {
    const router = Router();

    router
        .route('/')
        .post(
            authenticate(),
            authorize(['admin']),
            validateResource('create'),
            controller.create.bind(controller),
        )
        .get(validateResource('list'), controller.list.bind(controller));

    router
        .route('/:id')
        .get(validateResource('getById'), controller.getById.bind(controller))
        .put(
            authenticate(),
            authorize(['admin']),
            validateResource('update'),
            controller.update.bind(controller),
        )
        .delete(
            authenticate(),
            authorize(['admin']),
            validateResource('delete'),
            controller.delete.bind(controller),
        );

    return router;
};
