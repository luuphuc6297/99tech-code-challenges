import { ErrorType } from './app.error';

export const ErrorTypes = {
    UnknownError: {
        message: 'Unknown error',
        code: 1000,
        status: 500,
        isPublic: false,
    },
    ResourceNotFound: {
        message: 'Resource not found',
        code: 1001,
        status: 404,
        isPublic: true,
    },
    ValidationError: {
        message: 'Validation failed',
        code: 1002,
        status: 400,
        isPublic: true,
    },
    DatabaseError: {
        message: 'Database operation failed',
        code: 1003,
        status: 500,
        isPublic: false,
    },
    UnauthorizedError: {
        message: 'Unauthorized',
        code: 1004,
        status: 401,
        isPublic: true,
    },
    ForbiddenError: {
        message: 'Forbidden',
        code: 1005,
        status: 403,
        isPublic: true,
    },
} as const; 