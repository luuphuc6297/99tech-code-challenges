export interface ErrorType {
    message: string;
    code: number;
    status: number;
    isPublic: boolean;
}

export class AppError extends Error {
    public readonly code: number;
    public readonly status: number;
    public readonly isPublic: boolean;
    public readonly details?: unknown;

    constructor(errorType: ErrorType, details?: unknown) {
        super(errorType.message);
        this.name = this.constructor.name;
        this.code = errorType.code;
        this.status = errorType.status;
        this.isPublic = errorType.isPublic;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}
