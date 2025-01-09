import { ResourceMetadata } from '@/modules/resource/types/resource.types';

export class ResourceEntity {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public metadata?: ResourceMetadata,
    ) {}

    public update(name?: string, description?: string): void {
        if (name) this.name = name;
        if (description) this.description = description;
    }

    public validate(): boolean {
        if (this.name.length < 3 || this.name.length > 50) {
            return false;
        }
        if (this.description.length < 10 || this.description.length > 500) {
            return false;
        }
        return true;
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            metadata: this.metadata,
        };
    }
}
