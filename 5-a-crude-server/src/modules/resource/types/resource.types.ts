export interface ResourceMetadata {
    lastModified: Date;
    version: number;
}

export interface ResourceFilters {
    name?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface CreateResourceDTO {
    name: string;
    description: string;
}

export interface UpdateResourceDTO {
    name?: string;
    description?: string;
}

export interface Resource {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    metadata?: ResourceMetadata;
} 