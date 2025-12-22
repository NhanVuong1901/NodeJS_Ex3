import type { UserDatabase, UserEntity } from "./user.database.js";
import type { UserRole } from "./user.model.js";
export declare class UserService {
    private readonly userDb;
    constructor(userDb: UserDatabase);
    list(): Promise<(import("./user.model.js").UserDoc & {
        _id: import("bson").ObjectId;
    })[]>;
    register(input: {
        email: string;
        password: string;
        role?: UserRole;
    }): Promise<UserEntity>;
    bulkRegister(inputs: {
        email: string;
        password: string;
        role?: UserRole;
    }[]): Promise<UserEntity[]>;
    getByEmail(email: string): Promise<UserEntity>;
    getById(id?: string): Promise<UserEntity>;
    updateById(id?: string, body?: any): Promise<UserEntity>;
    deleteById(id?: string): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map