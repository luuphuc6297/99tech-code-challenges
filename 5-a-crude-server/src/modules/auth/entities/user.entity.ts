export class UserEntity {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string,
        public roles: string[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    public hasRole(role: string): boolean {
        return this.roles.includes(role);
    }

    public toJSON() {
        const { password, ...user } = this;
        return user;
    }
} 